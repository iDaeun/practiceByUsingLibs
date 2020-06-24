import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import interact from 'interactjs';
import {WidgetStorageService} from '../services/widget-storage.service';
import {Subscription} from 'rxjs';
import {PAGE, widget} from '../domain/widget-dto';
import {singleData} from '../domain/singleData';

@Component({
  selector: 'app-inside-page',
  templateUrl: './inside-page.component.html',
  styleUrls: ['./inside-page.component.css']
})
export class InsidePageComponent implements OnInit, OnDestroy {

  @Input()
  private readonly pageNum: PAGE;

  private clickedDiv: string;

  private interactEl;

  // Subscription
  private subscriptions: Subscription[] = [];
  private widget = new widget();

  // 현재 page : 저장된 데이터 조회 후 화면에 표시
  private dataList: Array<singleData> = [];

  // 연속적으로 div 추가 버튼 누르는지 여부
  private continuousAdding = false;

  // 브라우저 크기
  private innerWidth = window.innerWidth;
  private innerHeight = window.innerHeight;

  constructor(private storage: WidgetStorageService) { }

  ngOnInit() {
    // 현재 page : 데이터 불러와서 표시
    this.getDataList();
    this.showDataList();

    this.subscriptions.push(
      this.storage
        .changeTab$
        .subscribe(page => {
          // interact element reset
          if (this.interactEl) {
            this.interactEl.unset();
          }
          this.initializeDataList();
          // 이전 page : 데이터 저장
          if (page === this.pageNum) {
            this.setDataList();
            this.storeWidgetData();
          }
        })
    );

    this.interactEl = interact('.childDiv')
      .resizable({
        edges: {
          bottom: true,
          top: true,
          left: true,
          right: true
        },
        // The bind function returns a new function that is bound to the this you defined.
        onmove: this.resizeMoveListener.bind(this),
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      })
      .draggable({
        onmove: this.dragMoveListener.bind(this),
        inertia: true,
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.createSnapGrid({ x: 15, y: 15 })
            ],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {sub.unsubscribe()});
  }

  // drag and drop
  private dragMoveListener(event) {
    const target = event.target;

    let x = (parseFloat(target.style.left) || 0) + event.dx;
    let y = (parseFloat(target.style.top) || 0) + event.dy;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    this.continuousAdding = false;
  }

  private resizeMoveListener(event) {
    const target = event.target;

    target.style.width = `${event.rect.width}px`;
    target.style.height = `${event.rect.height}px`;

    let x = (parseFloat(target.style.left) || 0) + event.deltaRect.left;
    let y = (parseFloat(target.style.top) || 0) + event.deltaRect.top;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);

    this.continuousAdding = false;
  }

  // 클릭
  public click(e: MouseEvent) {
    this.clickedDiv = e.target[ 'id' ];
    console.log(this.clickedDiv);
  }

  // 정렬
  public up() {
    if (this.clickedDiv) {
      const childDiv = document.getElementById(this.clickedDiv.toString());
      childDiv.style.top = '0px';
      this.continuousAdding = false;
    }
  }

  public down() {
    if (this.clickedDiv) {
      const parentDiv = document.getElementById('parentDiv');
      const childDiv = document.getElementById(this.clickedDiv.toString());
      childDiv.style.top = `${parentDiv.offsetHeight - childDiv.offsetHeight}px`;
      this.continuousAdding = false;
    }
  }

  // 옮기기
  public top() {
    if (this.clickedDiv) {
      const parentDiv = document.getElementById('parentDiv');
      const childDiv = document.getElementById(this.clickedDiv.toString());
      parentDiv.insertAdjacentElement('beforeend', childDiv);
      this.continuousAdding = false;
    }
  }

  public bottom() {
    if (this.clickedDiv) {
      const parentDiv = document.getElementById('parentDiv');
      const childDiv = document.getElementById(this.clickedDiv.toString());
      parentDiv.insertAdjacentElement('afterbegin', childDiv);
      this.continuousAdding = false;
    }
  }

  // element 추가
  private setColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return 'rgb(' + x + ',' + y + ',' + z + ')';
  }

  public addDiv0() {
    let newDiv = document.createElement('div');
    let bgColor = this.setColor();
    newDiv.id = `childDiv${Math.floor(Math.random() * 100)}`;
    newDiv.className = 'childDiv';
    newDiv.textContent = 'new box!';
    newDiv.addEventListener('click', (event) => {
      this.click(event);
    });

    // 연속으로 div 추가 시 px 조정
    if (this.continuousAdding) {
      const parentDiv = document.getElementById('parentDiv');
      let upperDivLeft = parseFloat(parentDiv.children[ parentDiv.children.length - 1 ][ 'style' ].left) || 0;
      let upperDivTop = parseFloat(parentDiv.children[ parentDiv.children.length - 1 ][ 'style' ].top) || 0;

      newDiv.setAttribute('style', `background-color: ${bgColor}; position: absolute; box-sizing: border-box; touch-action: none; width: 400px; height: 400px; left: ${upperDivLeft + 20}px; top: ${upperDivTop + 20}px;`);
    } else {
      newDiv.setAttribute('style', `background-color: ${bgColor}; position: absolute; box-sizing: border-box; touch-action: none; width: 400px; height: 400px; left: 0px; top: 0px;`);
    }

    document.getElementById('parentDiv').appendChild(newDiv);
    this.continuousAdding = true;
  }

  private initializeDataList() {
    this.dataList = [];
  }

  // 현재 화면의 위젯 데이터 저장
  private setDataList() {
    const parentDiv = document.getElementById('parentDiv');
    if (parentDiv.children.length > 0) {
      Array.from(parentDiv.children).forEach(child => {
        let data: singleData = {
          id: child.id,
          bgCr: child[ 'style' ].backgroundColor,
          width: child[ 'offsetWidth' ] || 0,
          height: child[ 'offsetHeight' ] || 0,
          x: parseFloat(child[ 'style' ].left) || 0,
          y: parseFloat(child[ 'style' ].top) || 0,
          contents: {
            type: 'nnnnnnnn',
            content: child.innerHTML
          }
        };
        this.dataList.push(data);
      });
    }
  }

  // storage에 데이터 저장
  private storeWidgetData() {
    this.widget.page = this.pageNum;
    this.widget.data = this.dataList;

    let idx: number;
    if (this.storage.widgetDataList) {
      idx = this.storage.widgetDataList.findIndex(list => list.page == this.pageNum);
    }
    if (idx > -1) {
      this.storage.widgetDataList[ idx ] = this.widget;
    } else {
      this.storage.widgetDataList.push(this.widget);
    }
  }

  // storage에 저장된 위젯 데이터 가져오기
  private getDataList() {
    if (this.storage.widgetDataList) {
      let idx = this.storage.widgetDataList.findIndex(list => list.page == this.pageNum);
      if (idx > -1) {
        this.dataList = this.storage.widgetDataList[ idx ].data;
      }
    }
  }


  // 화면에 기존 도형 표시
  private showDataList() {
    if (this.dataList.length > 0) {
      const parentDiv = document.getElementById('parentDiv');
      this.dataList.forEach(data => {
        let newDiv = document.createElement('div');
        newDiv.id = data.id;
        newDiv.setAttribute('style', `background-color: ${data.bgCr}; position: absolute; box-sizing: border-box; touch-action: none; width: ${data.width}px; height: ${data.height}px;`);
        newDiv.style.left = `${data.x}px`;
        newDiv.style.top = `${data.y}px`;
        newDiv.className = 'childDiv';
        newDiv.addEventListener('click', (event) => {
          this.click(event);
        });
        newDiv.textContent = data.contents.content;

        parentDiv.appendChild(newDiv);
      });
    }
  }
}

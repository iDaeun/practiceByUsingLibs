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

  // Subscription
  private subscriptions: Subscription[] = [];
  private widget = new widget();

  // 현재 page : 저장된 데이터 조회 후 화면에 표시
  private dataList: Array<singleData> = [];

  constructor(private storage: WidgetStorageService) { }

  ngOnInit() {
    this.getDataList();
    console.log('*************************************************');
    console.log(this.pageNum + 'getDataList ------', this.dataList);
    this.showDataList();

    this.subscriptions.push(
      this.storage
        .changeTab$
        .subscribe(page => {
          this.initializeDataList();
          // 이전 page : 데이터 저장
          if (page === this.pageNum) {
            this.setDataList();
            console.log(this.pageNum + 'setDataList ------', this.dataList);
            this.storeWidgetData();
          }
        })
    );

    interact('.childDiv')
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
              interact.createSnapGrid({ x: 30, y: 30 })
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

    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
  }

  private resizeMoveListener(event) {
    const target = event.target;

    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);

    target.style.width = `${event.rect.width}px`;
    target.style.height = `${event.rect.height}px`;

    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
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
      childDiv.setAttribute('data-y', childDiv.style.top);
    }
  }

  public down() {
    if (this.clickedDiv) {
      const parentDiv = document.getElementById('parentDiv');
      const childDiv = document.getElementById(this.clickedDiv.toString());
      childDiv.style.top = `${parentDiv.offsetHeight - childDiv.offsetHeight}px`;
      childDiv.setAttribute('data-y', childDiv.style.top);
    }
  }

  // 옮기기
  public top() {
    if (this.clickedDiv) {
      const parentDiv = document.getElementById('parentDiv');
      const childDiv = document.getElementById(this.clickedDiv.toString());
      parentDiv.insertAdjacentElement('beforeend', childDiv);
    }
  }

  public bottom() {
    if (this.clickedDiv) {
      const parentDiv = document.getElementById('parentDiv');
      const childDiv = document.getElementById(this.clickedDiv.toString());
      parentDiv.insertAdjacentElement('afterbegin', childDiv);
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
    newDiv.setAttribute('style', `background-color: ${bgColor}; position: absolute; box-sizing: border-box; touch-action: none; width: 400px; height: 400px;`);
    newDiv.addEventListener('click', (event) => {
      this.click(event);
    });

    newDiv.textContent = 'new box!';
    document.getElementById('parentDiv').appendChild(newDiv);
  }

  public addDiv1() {

  }

  private initializeDataList() {
    this.dataList = [];
  }

  private setDataList() {
    const parentDiv = document.getElementById('parentDiv');
    if (parentDiv.children.length > 0) {
      Array.from(parentDiv.children).forEach(child => {
        let data: singleData = {
          id: child.id,
          bgCr: child[ 'style' ].backgroundColor,
          width: child[ 'offsetWidth' ] || 0,
          height: child[ 'offsetHeight' ] || 0,
          x: parseFloat(child.getAttribute('data-x')) || 0,
          y: parseFloat(child.getAttribute('data-y')) || 0,
          z: parseFloat(child.getAttribute('data-z')) || 0,
          contents: {
            type: 'nnnnnnnn',
            content: child.innerHTML
          }
        };
        this.dataList.push(data);
      });
    }
  }

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

    console.log('this.storage.widgetDataList ===== ', this.storage.widgetDataList);
  }

  private getDataList() {
    if (this.storage.widgetDataList) {
      let idx = this.storage.widgetDataList.findIndex(list => list.page == this.pageNum);
      if (idx > -1) {
        this.dataList = this.storage.widgetDataList[ idx ].data;
      }
    }
  }

  private showDataList() {
    if (this.dataList.length > 0) {
      const parentDiv = document.getElementById('parentDiv');
      this.dataList.forEach(data => {
        let newDiv = document.createElement('div');
        newDiv.id = data.id;
        newDiv.setAttribute('style', `background-color: ${data.bgCr}; position: absolute; box-sizing: border-box; touch-action: none; width: ${data.width}px; height: ${data.height}px;`);
        newDiv.setAttribute('data-x', `${data.x}px`);
        newDiv.setAttribute('data-y', `${data.y}px`);
        newDiv.setAttribute('data-z', `${data.z}px`);
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

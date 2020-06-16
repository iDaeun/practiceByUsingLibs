import {Component, HostListener, OnInit} from '@angular/core';
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
export class InsidePageComponent implements OnInit {

  private clickedDiv: string;

  // Subscription
  protected subscriptions: Subscription[] = [];
  private widget: widget;
  private dataList: Array<singleData>;

  constructor(private storage: WidgetStorageService) { }

  ngOnInit() {

    this.subscriptions.push(
      this.storage
        .changeTab$
        .subscribe(page => {
          this.storeWidgetData(page)
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
        inertia: true
      })
      .draggable({
        onmove: this.dragMoveListener.bind(this),
        inertia: true
      });
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
    }
  }

  public down() {
    if (this.clickedDiv) {
      const parentDiv = document.getElementById('parentDiv');
      const childDiv = document.getElementById(this.clickedDiv.toString());
      childDiv.style.top = `${parentDiv.offsetHeight - childDiv.offsetHeight}px`;
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

  private storeWidgetData(page: PAGE) {
    this.widget.page = page;
    this.widget.data = this.dataList;

    let idx = this.storage.widgetDataList.findIndex(list => list.page == page);

    if (idx > -1) {
      this.storage.widgetDataList[ idx ] = this.widget;
    } else {
      this.storage.widgetDataList.push(this.widget);
    }
  }
}

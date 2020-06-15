import {Component, HostListener, OnInit} from '@angular/core';
import interact from 'interactjs';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.css']
})
export class CombinationComponent implements OnInit {

  public movedElement = '';
  private clickedDiv: string;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    // console.log(e);
  }

  constructor() { }

  ngOnInit() {

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
    this.movedElement = target.id;

    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
  }

  private resizeMoveListener(event) {
    const target = event.target;
    this.movedElement = target.id;

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
}

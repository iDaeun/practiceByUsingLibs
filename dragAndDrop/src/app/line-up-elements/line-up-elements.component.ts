import {Component, OnInit} from '@angular/core';
import interact from 'interactjs';

@Component({
  selector: 'app-line-up-elements',
  templateUrl: './line-up-elements.component.html',
  styleUrls: ['./line-up-elements.component.css']
})
export class LineUpElementsComponent implements OnInit {

  usedDiv = ['ONE', 'TWO', 'THREE', 'FOUR'];

  public movedElement = '';
  public clickedDiv = '';
  public setW = 0;
  public setH = 0;

  constructor() { }

  ngOnInit() {
    interact('.testLineUps')
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

  private dragMoveListener(event) {
    const target = event.target;
    this.movedElement = target.id;

    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  private resizeMoveListener(event) {
    const target = event.target;
    this.movedElement = target.id;

    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = `${event.rect.width}px`;
    target.style.height = `${event.rect.height}px`;

    this.setW = event.rect.width / 2;
    this.setH = event.rect.height / 2;

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
  }

  public top() {
    if (this.clickedDiv !== '') {
      this.usedDiv.forEach(id => {
        if (id === this.clickedDiv) {
          document.getElementById(this.clickedDiv.toString()).style.zIndex = '1';
        } else {
          document.getElementById(id).style.zIndex = '0';
        }
      });
    }
  }

  public bottom() {
    if (this.clickedDiv !== '') {
      this.usedDiv.forEach(id => {
        if (id === this.clickedDiv) {
          document.getElementById(this.clickedDiv.toString()).style.zIndex = '0';
        } else {
          document.getElementById(id).style.zIndex = '1';
        }
      });
    }
  }

  clickDiv(id: string) {
    this.clickedDiv = id;
  }

}

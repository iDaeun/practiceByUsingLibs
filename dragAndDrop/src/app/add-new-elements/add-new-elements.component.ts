import {Component, OnInit} from '@angular/core';
import interact from 'interactjs';

@Component({
  selector: 'app-add-new-elements',
  templateUrl: './add-new-elements.component.html',
  styleUrls: ['./add-new-elements.component.css']
})
export class AddNewElementsComponent implements OnInit {

  private readonly ADD_DIV = interact('.add-div');
  public movedElement = '';
  public setW = 0;
  public setH = 0;

  constructor() { }

  ngOnInit() {

    interact('.add-div')
      .resizable({
        edges: {
          bottom: true,
          top: true,
          left: true,
          right: true
        },
        // The bind function returns a new function that is bound to the this you defined.
        onmove: this.resizeMoveListener.bind(this),
        // listeners: {
        //   move(event) { this.resizeMoveListener(event); }
        // },
        inertia: true
      })
      .draggable({
        onmove: this.dragMoveListener.bind(this),
        // listeners: {
        //   move(event) { this.dragMoveListener(event); }
        // },
        inertia: true
      });
  }

  private dragMoveListener(event) {
    const target = event.target;
    this.movedElement = target.id;
    // this.movedElement = movedElement;

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

  public addDiv() {
    console.log(this.ADD_DIV.target);

    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = 'rgb(' + x + ',' + y + ',' + z + ')';

    if (this.movedElement) {
      let newDiv = document.createElement('div');
      newDiv.setAttribute('style', `background-color: ${bgColor}; width: ${this.setW}px; height: ${this.setH}px; padding: 20px`);
      newDiv.textContent = 'new box!';

      let origin = document.getElementById(this.movedElement.toString());
      origin.appendChild(newDiv);
    }

  }

}

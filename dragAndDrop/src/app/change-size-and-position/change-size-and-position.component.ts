import {Component, OnInit} from '@angular/core';
import interact from 'interactjs';

@Component({
  selector: 'app-change-size-and-position',
  templateUrl: './change-size-and-position.component.html',
  styleUrls: ['./change-size-and-position.component.css']
})
export class ChangeSizeAndPositionComponent implements OnInit {

  public position = { x: 0, y: 0 };

  constructor() { }

  ngOnInit() {

    const position = { x: 0, y: 0 };

    // draggable #1
    // interact('.draggable').draggable({
    //   listeners: {
    //
    //     start(event) {
    //       // console.log('start event -- ', event);
    //       console.log(event.type, event.target)
    //     },
    //     move(event) {
    //       // console.log('move event -- ', event);
    //       position.x += event.dx;
    //       position.y += event.dy;
    //
    //       event.target.style.transform =
    //         `translate(${position.x}px, ${position.y}px)`;
    //     }
    //   }
    // });

    // draggable #2
    interact('.draggable')
      .draggable({})
      .on('dragmove', (event) => {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      });

    // lock the drag to the starting direction
    interact('.singleAxisTarget').draggable({
      startAxis: 'xy',
      lockAxis: 'start',
      listeners: {

        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {
          position.x += event.dx;
          position.y += event.dy;

          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`;
        }
      }
    });

    // only drag if the drag was started horizontally
    interact('.horizontalTarget').draggable({
      startAxis: 'x',
      lockAxis: 'x',
      listeners: {

        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {
          position.x += event.dx;
          position.y += event.dy;

          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`;
        }
      }
    });

    interact('.cursorChecker').draggable({
      cursorChecker: (action, interactable, element, interacting) => {
        switch (action.axis) {
          case 'x':
            return 'ew-resize';
          case 'y':
            return 'ns-resize';
          default:
            return interacting ? 'grabbing' : 'grab';
        }
      },
      listeners: {

        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {
          position.x += event.dx;
          position.y += event.dy;

          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`;
        }
      }
    });

    this.position = position;
  }
}

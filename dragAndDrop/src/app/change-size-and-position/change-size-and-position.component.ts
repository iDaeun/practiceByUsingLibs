import {Component, OnInit} from '@angular/core';
import interact from 'interactjs';

@Component({
  selector: 'app-change-size-and-position',
  templateUrl: './change-size-and-position.component.html',
  styleUrls: ['./change-size-and-position.component.css']
})
export class ChangeSizeAndPositionComponent implements OnInit {

  public position = { x: 0, y: 0 };
  public size = { width: '0px', height: '0px' };

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

    // ----------------------------------------------------------
    const size = { width: '0px', height: '0px' };

    interact('.resizable').resizable({

      edges: {
        bottom: true,
        top: true,
        left: true,
        right: true
      },

      invert: 'reposition', // specify what should happen if the target would be resized to dimensions less than 0x0

      listeners: {

        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {

          const target = event.target;
          let x = (parseFloat(target.getAttribute('data-x')) || 0);
          let y = (parseFloat(target.getAttribute('data-y')) || 0);

          event.target.style.width = `${event.rect.width}px`;
          event.target.style.height = `${event.rect.height}px`;

          size.width = event.target.style.width;
          size.height = event.target.style.height;

          event.target.style.transform =
            `translate(${x + event.deltaRect.left}px, ${y + event.deltaRect.top}px)`;

          target.setAttribute('data-x', x + event.deltaRect.left);
          target.setAttribute('data-y', y + event.deltaRect.top);
        }
      }
    });

    this.size = size;

    // ----------------------------------------------------------
    // resize & re-position

    function dragMoveListener(event) {
      let target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.transform = `translate(${x}px, ${y}px)`;

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

    interact('.resize-drag')
      .resizable({

        edges: {
          bottom: true,
          top: true,
          left: true,
          right: true
        },

        listeners: {
          start(event) {
            console.log(event.type, event.target)
          },
          move(event) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
          }
        },

        modifiers: [
          // keep the edges inside the parent
          // interact.modifiers.restrictEdges({
          //   outer: 'parent'
          // }),
          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 }
          })
        ],

        inertia: true

      })
      .draggable({
        listeners: {
          move(event) {
            dragMoveListener(event);
          }
        },
        inertia: true,
        // modifiers: [
        //   interact.modifiers.restrictRect({
        //     restriction: 'parent',
        //     endOnly: true
        //   })
        // ]
      });

  }

}

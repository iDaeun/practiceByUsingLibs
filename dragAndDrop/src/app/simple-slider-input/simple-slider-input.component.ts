import {Component, OnInit} from '@angular/core';
import interact from 'interactjs'

@Component({
  selector: 'app-simple-slider-input',
  templateUrl: './simple-slider-input.component.html',
  styleUrls: ['./simple-slider-input.component.css']
})
export class SimpleSliderInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Step 1
    const slider = interact('.slider');    // target elements with the "slider" class

    interact('.slider')    // target elements with the 'slider' class
      .draggable({                        // make the element fire drag events
        origin: 'self',                   // (0, 0) will be the element's top-left
        inertia: true,                    // start inertial movement if thrown
        modifiers: [
          interact.modifiers.restrict({
            restriction: 'self'           // keep the drag coords within the element
          })
        ]
      })
      .on('dragmove', function (event) {  // call this listener on every dragmove
        const sliderWidth = interact.getElementRect(event.target.parentNode).width;
        const value = event.pageX / sliderWidth;

        event.target.style.paddingLeft = (value * 100) + '%';
        event.target.setAttribute('data-value', value.toFixed(2));

        console.log('slider -- ', slider);
      })

  }

}

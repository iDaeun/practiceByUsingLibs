import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSliderInputComponent } from './simple-slider-input.component';

describe('SimpleSliderInputComponent', () => {
  let component: SimpleSliderInputComponent;
  let fixture: ComponentFixture<SimpleSliderInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSliderInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSliderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

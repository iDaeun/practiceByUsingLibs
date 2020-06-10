import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineUpElementsComponent } from './line-up-elements.component';

describe('LineUpElementsComponent', () => {
  let component: LineUpElementsComponent;
  let fixture: ComponentFixture<LineUpElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineUpElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineUpElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

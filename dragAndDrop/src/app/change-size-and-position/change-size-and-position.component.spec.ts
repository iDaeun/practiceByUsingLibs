import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSizeAndPositionComponent } from './change-size-and-position.component';

describe('ChangeSizeAndPositionComponent', () => {
  let component: ChangeSizeAndPositionComponent;
  let fixture: ComponentFixture<ChangeSizeAndPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSizeAndPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSizeAndPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

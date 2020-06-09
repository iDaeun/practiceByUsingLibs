import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewElementsComponent } from './add-new-elements.component';

describe('AddNewElementsComponent', () => {
  let component: AddNewElementsComponent;
  let fixture: ComponentFixture<AddNewElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

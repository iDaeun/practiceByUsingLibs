import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsidePageComponent } from './inside-page.component';

describe('InsidePageComponent', () => {
  let component: InsidePageComponent;
  let fixture: ComponentFixture<InsidePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsidePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleSliderInputComponent } from './simple-slider-input/simple-slider-input.component';
import { ChangeSizeAndPositionComponent } from './change-size-and-position/change-size-and-position.component';
import { AddNewElementsComponent } from './add-new-elements/add-new-elements.component';
import { LineUpElementsComponent } from './line-up-elements/line-up-elements.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleSliderInputComponent,
    ChangeSizeAndPositionComponent,
    AddNewElementsComponent,
    LineUpElementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleSliderInputComponent } from './simple-slider-input/simple-slider-input.component';
import { ChangeSizeAndPositionComponent } from './change-size-and-position/change-size-and-position.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleSliderInputComponent,
    ChangeSizeAndPositionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

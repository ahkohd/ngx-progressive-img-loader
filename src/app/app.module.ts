import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxProgressiveImgLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';

import { DeathRowDatasetService } from './services/death-row-dataset.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ DeathRowDatasetService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

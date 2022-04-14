import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { DeveloperComponent } from './developer/developer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoryComponent } from './story/story.component';


@NgModule({
  declarations: [
    HomeComponent,
    DeveloperComponent,
    StoryComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }

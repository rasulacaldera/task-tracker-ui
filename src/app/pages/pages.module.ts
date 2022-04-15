import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { DeveloperComponent } from './developer/developer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoryComponent } from './story/story.component';
import { BugComponent } from './bug/bug.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    HomeComponent,
    DeveloperComponent,
    StoryComponent,
    BugComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class PagesModule { }

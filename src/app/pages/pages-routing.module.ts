import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugComponent } from './bug/bug.component';
import { DeveloperComponent } from './developer/developer.component';
import { HomeComponent } from './home/home.component';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'developer', component: DeveloperComponent },
  { path: 'story', component: StoryComponent },
  { path: 'bug', component: BugComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

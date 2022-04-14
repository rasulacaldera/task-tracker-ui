import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/services/notification.service';
import { StoryService } from 'src/services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  stories: any = [];

  constructor(private storyService: StoryService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories() {
    this.storyService.getAllStories().subscribe(res => {
      this.stories = res;
    }, err => {
      this.notificationService.showError(err.error.message)
    })
  }

  onEnterUpdateMode(story: any) {

  }

  onDelete(id: any) {
    this.storyService.deleteStory(id).subscribe(res => {
      this.notificationService.showSuccess("Successfully deleted Story");
      this.loadStories();
    }, err => {
      this.notificationService.showError(err.error.message)
    })
  }
}

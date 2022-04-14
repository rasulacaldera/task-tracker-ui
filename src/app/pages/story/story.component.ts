import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageMode } from 'src/constants/page-mode';
import { DeveloperService } from 'src/services/developer.service';
import { NotificationService } from 'src/services/notification.service';
import { StoryService } from 'src/services/story.service';
import Utils from 'src/utils/Utils';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  stories: any = [];
  developers: any = [];
  mode: PageMode = PageMode.VIEW;
  storyForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    assignedDeveloperId: new FormControl(''),
    estimation: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private storyService: StoryService,
    private developerService: DeveloperService,
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
    this.loadAllDevelopers()
  }

  onEnterUpdateMode(story: any) {
    this.storyForm.reset();
    this.mode = PageMode.UPDATE;
    this.storyForm.setValue(this.proccessAndGetStoryForUpdate(story));
  }

  onDelete(id: any) {
    this.storyService.deleteStory(id).subscribe(res => {
      this.notificationService.showSuccess("Successfully deleted Story");
      this.loadStories();
    }, err => {
      this.notificationService.showError(err.error.message)
    })
  }

  onEnterCreateMode() {
    this.mode = PageMode.CREATE;
  }

  onSave() {
    if (this.isCreateMode()) {
      let story = Utils.removeEmptyStrings(this.storyForm.value);
      this.storyService.createStory(story).subscribe(res => {
        this.notificationService.showSuccess("Successfully created Story");
        this.refreshAfterSave();
      }, err => {
        this.notificationService.showError(err.error.message)
      })
    } else {
      let story = Utils.removeEmptyStrings(this.storyForm.value);
      this.storyService.updateStory(story.id, story).subscribe(res => {
        this.notificationService.showSuccess("Successfully updated Story");
        this.refreshAfterSave();
      }, err => {
        this.notificationService.showError(err.error.message)
      })
    }
  }

  isViewMode(): boolean {
    return this.mode == PageMode.VIEW
  }

  isCreateMode(): boolean {
    return this.mode == PageMode.CREATE
  }

  loadAllDevelopers() {
    this.developerService.getAllDevelopers().subscribe(res => {
      this.developers = res
    })
  }

  refreshAfterSave() {
    this.loadAllDevelopers();
    this.loadStories();
    this.storyForm.reset();
    this.mode = PageMode.VIEW
  }

  saveBtnEnabled() {
    return this.storyForm.dirty;
  }

  proccessAndGetStoryForUpdate(story: any) {
    return {
      id: story.id,
      title: story.title,
      description: story.description,
      estimation: story.estimation,
      status: story.status,
      assignedDeveloperId: story.assignedDeveloper ? story.assignedDeveloper.id : null
    }

  }
}

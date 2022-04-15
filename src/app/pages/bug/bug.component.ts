import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageMode } from 'src/constants/page-mode';
import { BugService } from 'src/services/bug.service';
import { DeveloperService } from 'src/services/developer.service';
import { NotificationService } from 'src/services/notification.service';
import Utils from 'src/utils/Utils';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;

  bugs: any = [];
  developers: any = [];
  mode: PageMode = PageMode.VIEW;
  bugForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    assignedDeveloperId: new FormControl(''),
    priority: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private bugService: BugService,
    private developerService: DeveloperService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories() {
    this.bugService.getAllBugs().subscribe(res => {
      this.bugs = res;
    }, err => {
      this.notificationService.showError(err.error.message)
    })
    this.loadAllDevelopers()
  }

  onEnterUpdateMode(story: any) {
    this.bugForm.reset();
    this.mode = PageMode.UPDATE;
    this.bugForm.setValue(this.proccessAndGetBugForUpdate(story));
  }

  onDelete(id: any) {
    this.bugService.deleteBug(id).subscribe(res => {
      this.notificationService.showSuccess("Successfully deleted Bug");
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
      let story = Utils.removeEmptyStrings(this.bugForm.value);
      this.bugService.createBug(story).subscribe(res => {
        this.notificationService.showSuccess("Successfully created Bug");
        this.refreshAfterSave();
      }, err => {
        this.notificationService.showError(err.error.message)
      })
    } else {
      let story = Utils.removeEmptyStrings(this.bugForm.value);
      this.bugService.updateBug(story.id, story).subscribe(res => {
        this.notificationService.showSuccess("Successfully updated Bug");
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
    this.bugForm.reset();
    this.mode = PageMode.VIEW
  }

  saveBtnEnabled() {
    return this.bugForm.dirty;
  }

  proccessAndGetBugForUpdate(story: any) {
    return {
      id: story.id,
      title: story.title,
      description: story.description,
      status: story.status,
      priority: story.priority,
      assignedDeveloperId: story.assignedDeveloper ? story.assignedDeveloper.id : null
    }
  }

}

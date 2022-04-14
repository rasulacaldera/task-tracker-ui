import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeveloperService } from 'src/services/developer.service';
import { PageMode } from 'src/constants/page-mode';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  developers: any = [];
  developerName = new FormControl('');
  mode: PageMode = PageMode.VIEW
  developerId: any = undefined;

  constructor(private developerService: DeveloperService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadAllDevelopers();
  }

  loadAllDevelopers() {
    this.developerService.getAllDevelopers().subscribe(res => {
      this.developers = res
    })
  }

  onSave() {
    if (this.isCreateMode()) {
      this.developerService.createDeveloper({ name: this.developerName.value }).subscribe(res => {
        this.notificationService.showSuccess("Successfully created Developer");
        this.refreshAfterSave();
      }, err => {
        this.notificationService.showError(err.error.message)
      })
    } else {
      this.developerService.updateDeveloper(this.developerId, { name: this.developerName.value }).subscribe(res => {
        this.refreshAfterSave();
      }, err => {
        this.notificationService.showError(err.error.message)
      })
    }
  }

  onEnterCreateMode() {
    this.mode = PageMode.CREATE
  }

  onEnterUpdateMode(developer: any) {
    this.mode = PageMode.UPDATE
    this.developerId = developer.id;
    this.developerName.setValue(developer.name);
  }

  onDelete(id: any) {
    this.developerService.deleteDeveloper(id).subscribe(res => {
      this.notificationService.showSuccess("Successfully deleted Developer");
      this.loadAllDevelopers();
    }, err => {
      this.notificationService.showError(err.error.message)
    })
  }

  isViewMode(): boolean {
    return this.mode == PageMode.VIEW
  }

  isCreateMode(): boolean {
    return this.mode == PageMode.CREATE
  }

  refreshAfterSave() {
    this.loadAllDevelopers();
    this.developerId = undefined;
    this.developerName.setValue(undefined);
    this.mode = PageMode.VIEW
  }
}

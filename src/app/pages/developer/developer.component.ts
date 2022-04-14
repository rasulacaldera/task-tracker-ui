import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeveloperService } from 'src/services/developer.service';
import { PageMode } from 'src/constants/page-mode';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  developers: any = [];
  developerName = new FormControl('');
  mode: PageMode = PageMode.CREATE
  developerId: any = undefined;

  constructor(private developerService: DeveloperService) { }

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
        this.refreshAfterSave();
      })
    } else {
      this.developerService.updateDeveloper(this.developerId, { name: this.developerName.value }).subscribe(res => {
        this.refreshAfterSave();
      })
    }
  }

  onEnterUpdate(developer: any) {
    this.mode = PageMode.UPDATE
    this.developerId = developer.id;
    this.developerName.setValue(developer.name);
  }

  onDelete(id: any) {
    this.developerService.deleteDeveloper(id).subscribe(res => {
      this.loadAllDevelopers();
    })
  }

  isCreateMode(): boolean {
    return this.mode == PageMode.CREATE
  }

  refreshAfterSave() {
    this.loadAllDevelopers();
    this.developerId = undefined;
    this.developerName.setValue(undefined);
    this.mode = PageMode.CREATE
  }
}

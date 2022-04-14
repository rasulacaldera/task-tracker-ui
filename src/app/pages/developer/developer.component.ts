import { Component, OnInit } from '@angular/core';
import { DeveloperService } from 'src/services/developer.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  developers: any = [];

  constructor(private developerService: DeveloperService) { }

  ngOnInit(): void {
    this.loadAllDevelopers();
  }

  loadAllDevelopers() {
    this.developerService.getAllDevelopers().subscribe(res => {
      this.developers = res
    })
  }
}

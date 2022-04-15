import { Component, OnInit } from '@angular/core';
import { faBug, faBook, faUserAstronaut, faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  faBug = faBug;
  faBook = faBook;
  faUserAstronaut = faUserAstronaut;
  faChartLine = faChartLine;

  constructor() { }

  ngOnInit(): void {
  }

}

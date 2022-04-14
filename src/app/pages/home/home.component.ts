import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/services/plan.service';
import { map } from 'rxjs/operators'
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  weeklyPlanList: any = [];

  constructor(private planService: PlanService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadweeklyPlan();
  }

  loadweeklyPlan() {
    this.planService.getPlan().subscribe(res => {
      this.weeklyPlanList = res
    }, err => {
      this.notificationService.showError(err.error.message)
    })
  }

}

import { Injectable } from '@angular/core';
import { SERVER } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private PLAN_SERVICE: string = SERVER + '/plan';

  constructor(private http: HttpClient) { }

  getPlan() {
    return this.http.get(this.PLAN_SERVICE);
  }
}

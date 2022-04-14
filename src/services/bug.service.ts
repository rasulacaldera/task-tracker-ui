import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  private BUG_SERVICE: string = SERVER + '/bug';

  constructor(private http: HttpClient) { }

  getAllBugs() {
    return this.http.get(this.BUG_SERVICE);
  }

  createBug(bug: any) {
    return this.http.post(this.BUG_SERVICE, bug);
  }

  updateBug(id: any, bug: any) {
    return this.http.put(this.BUG_SERVICE + "/" + id, bug);
  }

  deleteBug(id: any) {
    return this.http.delete(this.BUG_SERVICE + "/" + id);
  }
}

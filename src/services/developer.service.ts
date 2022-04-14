import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private DEVELOPER_SERVICE: string = SERVER + '/developer';

  constructor(private http: HttpClient) { }

  getAllDevelopers() {
    return this.http.get(this.DEVELOPER_SERVICE);
  }

  createDeveloper(developer: any) {
    return this.http.post(this.DEVELOPER_SERVICE, developer);
  }

  deleteDeveloper(id: any) {
    return this.http.delete(this.DEVELOPER_SERVICE + "/" + id);
  }
}

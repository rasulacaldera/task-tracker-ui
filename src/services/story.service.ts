import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private STORY_SERVICE: string = SERVER + '/story';

  constructor(private http: HttpClient) { }

  getAllStories() {
    return this.http.get(this.STORY_SERVICE);
  }

  createStory(story: any) {
    return this.http.post(this.STORY_SERVICE, story);
  }

  updateStory(id: any, story: any) {
    return this.http.put(this.STORY_SERVICE + "/" + id, story);
  }

  deleteStory(id: any) {
    return this.http.delete(this.STORY_SERVICE + "/" + id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostitiService {

  constructor(private http: HttpClient) { }

  public find(): Observable<PostitiEntity[]> {
    return this.http.get<PostitiEntity[]>(environment.urlSaaS + '/postiti');
  }
  public save(postiti: PostitiEntity) {
    if (postiti.id) {
      return this.update(postiti);
    } else {
      return this.create(postiti);
    }
  }
  public delete(id: number): Observable<PostitiEntity> {
    return this.http.delete<PostitiEntity>(environment.urlSaaS + '/postiti/' + id); 
  }
  private create(postiti: PostitiEntity): Observable<PostitiEntity> {
    return this.http.post<PostitiEntity>(environment.urlSaaS + '/postiti', postiti);
  }
  private update(postiti: PostitiEntity): Observable<PostitiEntity> {
    return this.http.put<PostitiEntity>(environment.urlSaaS + '/postiti/' + postiti.id, postiti);
  }

}

export class PostitiEntity {
  id: number;
  descricao: string;
}
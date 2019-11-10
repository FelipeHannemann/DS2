import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {

  constructor(private http: HttpClient) { }

  public find(): Observable<PsicologoEntity[]> {
    return this.http.get<PsicologoEntity[]>(environment.urlSaaS + '/psicologos');
  }
  public save(psicologo: PsicologoEntity) {
    if (psicologo.id) {
      return this.update(psicologo);
    } else {
      return this.create(psicologo);
    }
  }
  public delete(id: number): Observable<PsicologoEntity> {
    return this.http.delete<PsicologoEntity>(environment.urlSaaS + '/psicologos/' + id); 
  }
  private create(psicologo: PsicologoEntity): Observable<PsicologoEntity> {
    return this.http.post<PsicologoEntity>(environment.urlSaaS + '/psicologos', psicologo);
  }
  private update(psicologo: PsicologoEntity): Observable<PsicologoEntity> {
    return this.http.put<PsicologoEntity>(environment.urlSaaS + '/psicologos/' + psicologo.id, psicologo);
  }

}

export class PsicologoEntity {
  id: number;
  nome: string;
  crp: string;
  nomeclinica: string;
  email: string;
}
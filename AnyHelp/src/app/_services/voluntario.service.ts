import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CidadeEntity } from './cidade.service';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  constructor(private http: HttpClient) { }

  public find(): Observable<VoluntarioEntity[]> {
    return this.http.get<VoluntarioEntity[]>(environment.urlSaaS + '/voluntarios');
  }
  public save(voluntario: VoluntarioEntity) {
    if (voluntario.id) {
      return this.update(voluntario);
    } else {
      return this.create(voluntario);
    }
  }
  public delete(id: number): Observable<VoluntarioEntity> {
    return this.http.delete<VoluntarioEntity>(environment.urlSaaS + '/voluntarios/' + id); 
  }
  private create(voluntario: VoluntarioEntity): Observable<VoluntarioEntity> {
    return this.http.post<VoluntarioEntity>(environment.urlSaaS + '/voluntarios', voluntario);
  }
  private update(voluntario: VoluntarioEntity): Observable<VoluntarioEntity> {
    return this.http.put<VoluntarioEntity>(environment.urlSaaS + '/voluntarios/' + voluntario.id, voluntario);
  }

}

export class VoluntarioEntity {
  id: number;
  nome: string;
  apelido: string;
  cpf: string;
  email: string;
  cidade: CidadeEntity;
}
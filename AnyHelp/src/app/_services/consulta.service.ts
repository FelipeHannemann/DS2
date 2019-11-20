import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EstadoEntity } from './estado.service';
import { PsicologoEntity } from './psicologo.service';
import { VoluntarioEntity } from './voluntario.service';


@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient) { }

  public find(): Observable<ConsultaEntity[]> {
    return this.http.get<ConsultaEntity[]>(environment.urlSaaS + '/consultas');
  }
  public save(consulta: ConsultaEntity) {
    if (consulta.id) {
      return this.update(consulta);
    } else {
      return this.create(consulta);
    }
  }
  public delete(id: number): Observable<ConsultaEntity> {
    return this.http.delete<ConsultaEntity>(environment.urlSaaS + '/consultas/' + id); 
  }
  private create(consulta: ConsultaEntity): Observable<ConsultaEntity> {
    return this.http.post<ConsultaEntity>(environment.urlSaaS + '/consultas', consulta);
  }
  private update(consulta: ConsultaEntity): Observable<ConsultaEntity> {
    return this.http.put<ConsultaEntity>(environment.urlSaaS + '/consultas/' + consulta.id, consulta);
  }

}

export class ConsultaEntity {
  id: number;
  nome: string;
  psicologo: PsicologoEntity;
  voluntario: VoluntarioEntity;
  
}
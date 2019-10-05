import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public find(): Observable<ClienteEntity[]> {

    return this.http.get<ClienteEntity[]>(environment.urlSaaS + '/clientes')

  }
}

export class EstadoEntity {

  id: number;

  nome: string;

  sigla: string;

}

export class CidadeEntity {

  id: number;

  nome: string;

  lat: number;

  lng: number;

  estado: EstadoEntity;

}

export class ClienteEntity {
  id: number;

  nome: string;

  codigo: string;

  email: string;

  cidade: CidadeEntity;
}

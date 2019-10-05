import { Component, OnInit } from '@angular/core';
import { ClienteService, ClienteEntity } from '../_services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'codigo', 'nome', 'email', 'cidade'];

  public clientes: ClienteEntity[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit() {

    this.service.find().subscribe(result => {

      this.clientes = result;
    
    }, error => {
      console.error('Pau', error);
    });
  }

}

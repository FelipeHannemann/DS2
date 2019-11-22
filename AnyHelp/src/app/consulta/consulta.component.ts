import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_components/confirm-dialog/confirm-dialog.component';
import { ConsultaEntity, ConsultaService } from '../_services/consulta.service';
import { VoluntarioEntity, VoluntarioService } from '../_services/voluntario.service';
import { PsicologoEntity, PsicologoService } from '../_services/psicologo.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = [ 'nome', 'dtconsulta', 'psicologo', 'options' ];

  public consultas: ConsultaEntity[] = [];
  public voluntarios: VoluntarioEntity[] = [];
  public psicologos: PsicologoEntity[] = [];


  public consulta: ConsultaEntity = new ConsultaEntity();

  public dataSource = new MatTableDataSource<ConsultaEntity>();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: ConsultaService, private voluntarioService: VoluntarioService,
    private psicologoService: PsicologoService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {

    
    this.msgerror = '';
    this.loading = true;

    
    this.service.find().subscribe(result => {

      this.consultas = result;
      this.dataSource.data = this.consultas;
      this.voluntarioService.find().subscribe(result => {

        this.voluntarios = result;

        this.loading = false;

      }, error => {
        this.msgerror = error.message;
      });

      
      this.psicologoService.find().subscribe(result => {

        this.psicologos = result;

        this.loading = false;

      }, error => {
        this.msgerror = error.message;
      });

    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }
  private openSidebar(consulta: ConsultaEntity) {
    this.consulta = consulta;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new ConsultaEntity());
  }
  public editar(consulta: ConsultaEntity) {
    this.openSidebar(consulta);
  }
  public excluir(consulta: ConsultaEntity): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realmente excluir o registro?')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;
        this.service.delete(consulta.id).subscribe(result => {
          this.snackBar.open('Registro salvo com sucesso!', '', {
            duration: 3000
          });
        }, error => {
          this.msgerror = error.message;
        }).add(() => {
          this.loading = false;
        })
      }
    })
  }
  public confirmar() {
    this.loading = true;

    this.service.save(this.consulta).subscribe(result => {
      this.afterConfirm(result);
      this.snackBar.open('Registro salvo com sucesso!', '', {
        duration: 3000
      });
    }, error => {
      this.msgerror = error.message;
    }).add(() => {
      this.sidenav.close();

      this.loading = false;
    });
  }

  public compareOptions(id1, id2) {
    return id1 && id2 && id1.id === id2.id;
  }
  private afterConfirm(consulta: ConsultaEntity): void {
    this.consultas.push(consulta);
    this.dataSource.data = this.consultas;
  }
}


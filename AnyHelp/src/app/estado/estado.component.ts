import { EstadoEntity, EstadoService } from '../_services/estado.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = ['nome', 'sigla', 'options' ];

  public estados: EstadoEntity[] = [];

  public dataSource = new MatTableDataSource<EstadoEntity>();

  public estado: EstadoEntity = new EstadoEntity();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: EstadoService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {

    
    this.msgerror = '';
    this.loading = true;

    
    this.service.find().subscribe(result => {

      this.estados = result;
      this.dataSource.data = this.estados;
    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }
  private openSidebar(estado: EstadoEntity) {
    this.estado = estado;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new EstadoEntity());
  }
  public editar(estado: EstadoEntity) {
    this.openSidebar(estado);
  }
  public excluir(estado: EstadoEntity): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realmente excluir o registro?')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;
        this.service.delete(estado.id).subscribe(result => {
          this.snackBar.open('Registro excluido com sucesso!', '', {
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

    this.service.save(this.estado).subscribe(result => {
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
  private afterConfirm(estado: EstadoEntity): void {
    this.estados.push(estado);
    this.dataSource.data = this.estados;
    console.log('->', estado)
  }
}

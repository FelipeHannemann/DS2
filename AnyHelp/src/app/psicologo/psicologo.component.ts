import { PsicologoEntity, PsicologoService } from '../_services/psicologo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-psicologo',
  templateUrl: './psicologo.component.html',
  styleUrls: ['./psicologo.component.scss']
})
export class PsicologoComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = ['nome', 'crp', 'nomeclinica', 'email', 'options' ];

  public psicologos: PsicologoEntity[] = [];

  public dataSource = new MatTableDataSource<PsicologoEntity>();

  public psicologo: PsicologoEntity = new PsicologoEntity();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: PsicologoService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {

    
    this.msgerror = '';
    this.loading = true;

    
    this.service.find().subscribe(result => {

      this.psicologos = result;
      this.dataSource.data = this.psicologos;
    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }
  private openSidebar(psicologo: PsicologoEntity) {
    this.psicologo = psicologo;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new PsicologoEntity());
  }
  public editar(psicologo: PsicologoEntity) {
    this.openSidebar(psicologo);
  }
  public excluir(psicologo: PsicologoEntity): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realmente excluir o registro?')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;
        this.service.delete(psicologo.id).subscribe(result => {
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

    this.service.save(this.psicologo).subscribe(result => {
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
private afterConfirm(psicologo: PsicologoEntity): void {
  this.psicologos.push(psicologo);
  this.dataSource.data = this.psicologos;
  console.log('->', psicologo)
}
}

import { TabelaPrecoEntity, TabelaPrecoService } from '../_services/tabelapreco.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-tabelapreco',
  templateUrl: './tabelapreco.component.html',
  styleUrls: ['./tabelapreco.component.scss']
})
export class TabelaprecoComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = [ 'codigo', 'nome', 'fator', 'options' ];

  public tabelaprecos: TabelaPrecoEntity[] = [];


  public tabelapreco: TabelaPrecoEntity = new TabelaPrecoEntity();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: TabelaPrecoService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {

    
    this.msgerror = '';
    this.loading = true;

    
    this.service.find().subscribe(result => {

      this.tabelaprecos = result;
    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }
  private openSidebar(tabelapreco: TabelaPrecoEntity) {
    this.tabelapreco = tabelapreco;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new TabelaPrecoEntity());
  }
  public editar(tabelapreco: TabelaPrecoEntity) {
    this.openSidebar(tabelapreco);
  }
  public excluir(tabelapreco: TabelaPrecoEntity): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realmente excluir o registro?')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;
        this.service.delete(tabelapreco.id).subscribe(result => {
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

    this.service.save(this.tabelapreco).subscribe(result => {
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
}
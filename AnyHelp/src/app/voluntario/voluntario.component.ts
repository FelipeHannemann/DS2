import { VoluntarioEntity, VoluntarioService } from '../_services/voluntario.service';
import { CidadeService, CidadeEntity } from './../_services/cidade.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.component.html',
  styleUrls: ['./voluntario.component.scss']
})
export class VoluntarioComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = [ 'nome', 'apelido', 'cpf', 'email' ,'cidade', 'options' ];

  public voluntarios: VoluntarioEntity[] = [];
  public cidades: CidadeEntity[] = [];


  public voluntario: VoluntarioEntity = new VoluntarioEntity();
  public dataSource = new MatTableDataSource<VoluntarioEntity>();


  public msgerror: string;
  public loading: boolean;

  constructor(private service: VoluntarioService, private cidadeService: CidadeService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {

    
    this.msgerror = '';
    this.loading = true;

    
    this.service.find().subscribe(result => {

      this.voluntarios = result;

      this.cidadeService.find().subscribe(result => {

        this.cidades = result;
        this.dataSource.data = this.voluntarios;
        this.loading = false;

      }, error => {
        this.msgerror = error.message;
      });

    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }
  private openSidebar(voluntario: VoluntarioEntity) {
    this.voluntario = voluntario;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new VoluntarioEntity());
  }
  public editar(voluntario: VoluntarioEntity) {
    this.openSidebar(voluntario);
  }
  public excluir(voluntario: VoluntarioEntity): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realmente excluir o registro?')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;
        this.service.delete(voluntario.id).subscribe(result => {
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

    this.service.save(this.voluntario).subscribe(result => {
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
  private afterConfirm(voluntario: VoluntarioEntity): void {
    this.voluntarios.push(voluntario);
    this.dataSource.data = this.voluntarios;
    console.log('->', voluntario)
  }
}

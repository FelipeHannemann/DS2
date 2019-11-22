import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../_components/confirm-dialog/confirm-dialog.component';
import { PostitiEntity, PostitiService } from '../_services/postiti.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-postit',
  templateUrl: './postit.component.html',
  styleUrls: ['./postit.component.scss']
})
export class PostitComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public postitis: PostitiEntity[] = [];

  public dataSource = new MatTableDataSource<PostitiEntity>();

  


  public postiti: PostitiEntity = new PostitiEntity();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: PostitiService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {

    
    this.msgerror = '';
    this.loading = true;

    
    this.service.find().subscribe(result => {

      this.postitis = result;
      this.dataSource.data = this.postitis;
    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }
  private openSidebar(postiti: PostitiEntity) {
    this.postiti = postiti;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new PostitiEntity());
  }
  public editar(postiti: PostitiEntity) {
    this.openSidebar(postiti);
  }
  public excluir(postiti: PostitiEntity): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realmente excluir o registro?')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;
        this.service.delete(postiti.id).subscribe(result => {
          this.snackBar.open('Continue...', '', {
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

    this.service.save(this.postiti).subscribe(result => {
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

  private afterConfirm(postiti: PostitiEntity): void {
    this.postitis.push(postiti);
    this.dataSource.data = this.postitis;
  }
}

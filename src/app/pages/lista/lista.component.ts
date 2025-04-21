import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCriarEditarComponent } from './components/modal-criar-editar/modal-criar-editar.component';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  constructor(
    public dialog: MatDialog,
  ) { }

  criarEditar(colaborador = null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';

    this.dialog.open(ModalCriarEditarComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!result) {
        return;
      } else {
        this.atualizaLista();
      }
    });
  }

  atualizaLista() {

  }

  async excluir() {

    // var result = await this.confirmSvc.confirm("Deletar este imposto?", "Esta ação não é reversível");
    // if (result) {
    //   this.impostosSvc.deletar(imposto).subscribe((d: any) => {
    //     if (!d) {
    //       return;
    //     } else {
    //       this.toastr.success("Imposto deletado!");
    //       this.atualizaLista();
    //     }
    //   });
    // }
  }
}

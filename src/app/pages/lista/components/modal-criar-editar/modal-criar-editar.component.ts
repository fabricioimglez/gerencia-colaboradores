import { Component, Inject } from '@angular/core';
import { Colaborador } from '../../model/colaborador';

import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColaboradoresService } from '../../services/colaboradores.service';

@Component({
  selector: 'app-modal-criar-editar',
  standalone: false,
  templateUrl: './modal-criar-editar.component.html',
  styleUrl: './modal-criar-editar.component.scss'
})
export class ModalCriarEditarComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public colaborador: Colaborador,
    public dialogRef: MatDialogRef<ModalCriarEditarComponent>,
    private colaboradoresService : ColaboradoresService,
    private toastr: ToastrService,
  ) { }

  flagsInvalidos = {
    nome: false,
    email: false,
    telefone: false
  };

  async validaColaborador() {
    this.flagsInvalidos = {
      nome: false,
      email: false,
      telefone: false
    }

    if (!this.colaborador.nome || this.colaborador.nome.trim() === '') {
      this.flagsInvalidos.nome = true;
    }
    if (!this.colaborador.email || !this.colaborador.email.includes('@')) {
      this.flagsInvalidos.email = true;
    }
    if (!this.colaborador.telefone || this.colaborador.telefone.trim().length < 11) {
      this.flagsInvalidos.telefone = true;
    }

  }

  salvar() {
    if(this.colaborador.id_colaborador){
      this.colaboradoresService.criaColaborador(this.colaborador).subscribe(r => {
        this.dialogRef.close(true);
        this.toastr.success("Colaborador salvo!");
      })
    } else {
      this.colaboradoresService.editaColaborador(this.colaborador.id_colaborador, this.colaborador).subscribe(r => {
        this.dialogRef.close(true);
        this.toastr.success("Colaborador alterado!");
      })
    }
   
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

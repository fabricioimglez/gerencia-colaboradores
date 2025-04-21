import { Component, Inject } from '@angular/core';
import { Colaborador } from '../../model/colaborador';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

    // Validação nome
    if (!this.colaborador.nome || this.colaborador.nome.trim() === '') {
      this.flagsInvalidos.nome = true;
    }

    // Validação email
    if (!this.colaborador.email || !this.colaborador.email.includes('@')) {
      this.flagsInvalidos.email = true;
    }

    // Validação telefone
    if (!this.colaborador.telefone || this.colaborador.telefone.trim().length < 11) {
      this.flagsInvalidos.telefone = true;
    }

  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

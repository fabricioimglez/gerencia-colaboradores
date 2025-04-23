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
  colaborador: Colaborador;
  camposTocados: Record<string, boolean> = {};
  flagsInvalidos: Record<string, boolean> = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Colaborador | null,
    public dialogRef: MatDialogRef<ModalCriarEditarComponent>,
    private colaboradoresService: ColaboradoresService,
    private toastr: ToastrService,
  ) {
    this.colaborador = data ? data : Colaborador.novo();
  }

  tocarCampo(campo: keyof Colaborador) {
    this.camposTocados[campo] = true;
    this.validarCampos();
  }

  deveMostrarErro(campo: keyof Colaborador): boolean {
    return this.flagsInvalidos[campo] && this.camposTocados[campo];
  }

  validarCampos() {
    this.flagsInvalidos = {
      nome: !this.colaborador.nome || this.colaborador.nome.trim() === '',
      email: this.colaborador.email ? !this.colaborador.email.includes('@') : false, 
      telefone: this.colaborador.telefone? this.colaborador.telefone.replace(/\D/g, '').length < 11: false
    };
  }

  permitirSomenteNumeros(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  formatarTelefone() {
    if (this.colaborador.telefone) {
      let numeros = this.colaborador.telefone.replace(/[^\d]/g, '');
      numeros = numeros.slice(0, 11);

      this.colaborador.telefone = numeros.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})$/,
        (match, ddd, prefixo, sufixo) => {
          let resultado = '';
          if (ddd) resultado += `(${ddd}`;
          if (ddd.length === 2) resultado += ') ';
          if (prefixo) resultado += prefixo;
          if (sufixo) resultado += `-${sufixo}`;
          return resultado;
        }
      );
    }
  }

  salvar() {
    this.validarCampos();

    if (Object.values(this.flagsInvalidos).some(invalido => invalido)) {
      this.toastr.error('Preencha os campos corretamente.');
      return;
    }

    const acao = this.colaborador._id
      ? this.colaboradoresService.editaColaborador(this.colaborador._id, this.colaborador)
      : this.colaboradoresService.criaColaborador(this.colaborador);

    acao.subscribe(r => {
      this.dialogRef.close(true);
      r.status ? this.toastr.success(r.info) : this.toastr.error(r.info);
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

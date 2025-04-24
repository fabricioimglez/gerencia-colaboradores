import { Component, Inject } from '@angular/core';
import { Local } from '../../model/local';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-modal-criar-editar-local',
  standalone: false,
  templateUrl: './modal-criar-editar-local.component.html',
  styleUrl: './modal-criar-editar-local.component.scss'
})
export class ModalCriarEditarLocalComponent {
  local: Local;
  camposTocados: Record<string, boolean> = {};
  flagsInvalidos: Record<string, boolean> = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Local | null,
    public dialogRef: MatDialogRef<ModalCriarEditarLocalComponent>,
    private localService: LocalService,
    private toastr: ToastrService,
  ) {
    this.local = data ? data : Local.novo();
  }

  tocarCampo(campo: keyof Local) {
    this.camposTocados[campo] = true;
    this.validarCampos();
  }

  deveMostrarErro(campo: keyof Local): boolean {
    return this.flagsInvalidos[campo] && this.camposTocados[campo];
  }

  validarCampos() {
    this.flagsInvalidos = {
      nome: !this.local.nome || this.local.nome.trim() === '',
      sigla: !this.local.sigla || this.local.sigla.trim() === ''
    };
  }

  permitirSomenteNumeros(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  salvar() {
    this.validarCampos();
    if (Object.values(this.flagsInvalidos).some(invalido => invalido)) {
      this.toastr.error('Preencha os campos corretamente.');
      return;
    }
    if (this.local.sigla) {
      this.local.sigla = this.local.sigla.toUpperCase();
    }
    const acao = this.local._id
      ? this.localService.editaLocal(this.local._id, this.local)
      : this.localService.criaLocal(this.local);

    acao.subscribe(r => {
      this.dialogRef.close(true);
      r.status ? this.toastr.success(r.info) : this.toastr.error(r.info);
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

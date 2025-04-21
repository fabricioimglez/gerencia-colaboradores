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

  ngOnInit(): void {
    console.log(this.colaborador);
    
  }

}

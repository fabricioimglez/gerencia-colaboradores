import { Component } from '@angular/core';
import { Colaborador } from '../../model/colaborador';

@Component({
  selector: 'app-modal-criar-editar',
  standalone: false,
  templateUrl: './modal-criar-editar.component.html',
  styleUrl: './modal-criar-editar.component.scss'
})
export class ModalCriarEditarComponent {
  colaborador: Colaborador = new Colaborador;
}

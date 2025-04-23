import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradoresService } from '../lista/services/colaboradores.service';
import { Colaborador } from '../lista/model/colaborador';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

   colaboradores: Colaborador[] = []
    filtroDigitado: string = '';
    sugestoes: Colaborador[] = [];
    listaColaboradoresFiltrada: Colaborador[] = []

  constructor(
    private router: Router,
        private colaboradoresService: ColaboradoresService,
  ) {}

  ngOnInit(): void {
    this.consultaLista();
  }

  consultaLista() {
    this.colaboradoresService.listaColaboradores().subscribe((r: any) => {
      this.colaboradores = r;
      this.listaColaboradoresFiltrada = [...this.colaboradores];
    })
  }

  direcionaLista() {
    this.router.navigate(['/colaboradores']);
  }

  formatarNumero(telefone: any) {
    return telefone.replace(/\D/g, '');
  }
}

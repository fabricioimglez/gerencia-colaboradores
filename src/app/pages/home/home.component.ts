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

  onDigitar(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();
    this.filtroDigitado = valor;

    if (valor) {
      this.sugestoes = this.colaboradores.filter(c =>
        c.nome.toLowerCase().includes(valor) ||
        c.telefone?.toLowerCase().includes(valor) ||
        c.email?.toLowerCase().includes(valor)
      );
    } else {
      this.sugestoes = [];
    }
  }

  buscar(): void {
    const valor = this.filtroDigitado.trim().toLowerCase();

    if (!valor) {
      this.listaColaboradoresFiltrada = [...this.colaboradores];
    } else {
      this.listaColaboradoresFiltrada = this.colaboradores.filter(c =>
        c.nome.toLowerCase().includes(valor) ||
        c.telefone?.toLowerCase().includes(valor) ||
        c.email?.toLowerCase().includes(valor)
      );
      this.listaColaboradoresFiltrada.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    this.sugestoes = [];
  }

  selecionarSugestao(colaborador: Colaborador): void {
    this.filtroDigitado = colaborador.nome;
    this.buscar();
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradoresService } from '../lista/services/colaboradores.service';
import { Colaborador } from '../lista/model/colaborador';
import { LocalService } from '../local/service/local.service';
import { Local } from '../local/model/local';

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
  locais: Local[] = [];
  listaColaboradoresFiltrada: Colaborador[] = [];
  localSelecionado: any = '';

  constructor(
    private router: Router,
    private colaboradoresService: ColaboradoresService,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    this.consultaLista();
    this.listaLocais();
  }

  listaLocais() {
    this.localService.listaLocais().subscribe((r: any) => {
      this.locais = r;
      this.locais.sort((a, b) => a.nome.localeCompare(b.nome));
    });
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
      let temp =  [...this.colaboradores]
      if (this.localSelecionado != "") {
       temp = this.colaboradores.filter(c => c.id_local === this.localSelecionado);
     }
      this.sugestoes = temp.filter(c =>
        c.nome.toLowerCase().includes(valor) ||
        c.telefone?.toLowerCase().includes(valor) ||
        c.email?.toLowerCase().includes(valor)
      );
    } else {
      this.sugestoes = [];
    }
  }

  getLocal(id_local: any = '') {
    let temp = this.locais.find(l => l._id == id_local)
    if (temp) {
      return "De " + temp.nome + " - " + temp.sigla
    } else {
      return ""
    }
  }

  buscar(): void {

    let valor = this.filtroDigitado.trim().toLowerCase();
    let temp =  [...this.colaboradores]
    if (this.localSelecionado != "") {
       temp = this.colaboradores.filter(c => c.id_local === this.localSelecionado);
    }

    if (!valor) {
      this.listaColaboradoresFiltrada = temp;
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

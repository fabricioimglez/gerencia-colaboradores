import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCriarEditarComponent } from './components/modal-criar-editar/modal-criar-editar.component';
import { Colaborador } from './model/colaborador';
import { ColaboradoresService } from './services/colaboradores.service';
import { ToastrService } from 'ngx-toastr';
import { Local } from '../local/model/local';
import { LocalService } from '../local/service/local.service';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  colaboradores: Colaborador[] = []
  filtroDigitado: string = '';
  sugestoes: Colaborador[] = [];
  listaColaboradoresFiltrada: Colaborador[] = []
  locais: Local[] = [];
  localSelecionado: any = '';

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private colaboradoresService: ColaboradoresService,
    private localService: LocalService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.atualizaLista();
    this.listaLocais();
  }

  atualizaLista() {
    this.colaboradoresService.listaColaboradores().subscribe((r: any) => {
      this.colaboradores = r;
      this.colaboradores.sort((a, b) => a.nome.localeCompare(b.nome));
      this.listaColaboradoresFiltrada = [...this.colaboradores];
    })
  }

  listaLocais() {
    this.localService.listaLocais().subscribe((r: any) => {
      this.locais = r;
      this.locais.sort((a, b) => a.nome.localeCompare(b.nome));
    });
  }

  getLocal(id_local: any = '') {
    let temp = this.locais.find(l => l._id == id_local)
    if (temp) {
      return temp.nome + " - " + temp.sigla
    } else {
      return "Sem local definido"
    }
  }


  //verifica se o campo saiu de foco
  @HostListener('document:click', ['$event'])
  onClickFora(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.sugestoes = [];
      this.buscar();
    }
  }

  //faz a verificação enquanto digita e busca parecidos
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

  criarEditar(colaborador: any = null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = JSON.parse(JSON.stringify(colaborador));


    this.dialog.open(ModalCriarEditarComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!result) {
        return;
      } else {
        this.atualizaLista();
      }
    });
  }

  async excluir(colaborador: any) {
    if (confirm(`Deseja excluir ${colaborador.nome} ? `)) {
      this.colaboradoresService.excluiColaborador(colaborador._id).subscribe((r: any) => {
        if (r.status) {
          this.toastr.success(r.info);
          this.atualizaLista();
        } else {
          this.toastr.error(r.info);
        }
      });
    }
  }
}

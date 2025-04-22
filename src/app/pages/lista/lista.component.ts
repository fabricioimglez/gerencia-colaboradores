import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCriarEditarComponent } from './components/modal-criar-editar/modal-criar-editar.component';
import { Colaborador } from './model/colaborador';
import { ColaboradoresService } from './services/colaboradores.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private colaboradoresService: ColaboradoresService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.atualizaLista();
  }

  atualizaLista() {
    this.colaboradoresService.listaColaboradores().subscribe((r: any) => {
      this.colaboradores = r;
      this.listaColaboradoresFiltrada = [...this.colaboradores];
    })
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

  async excluirComentario(_id: any) {
    this.colaboradoresService.excluiColaborador(_id).subscribe((r: any) => {
      if (r.status) {
        this.toastr.success(r.info);
      } else {
        this.toastr.error(r.info);
      }
    });
  }
}

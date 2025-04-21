import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCriarEditarComponent } from './components/modal-criar-editar/modal-criar-editar.component';
import { Colaborador } from './model/colaborador';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  colaboradores: Colaborador[] = [
    {id_colaborador:1, nome:"Thiago de Carvalho", email:"thiago.c@gmail.com", telefone:"43998006954"},
    {id_colaborador:2, nome:"Maria de Abreu", email:"mariaAbreu@gmail.com", telefone:"439654182"},
    {id_colaborador:3, nome:"Carlos Monteiro", email:"carlos_m@gmail.com", telefone:"4395423256"},
    {id_colaborador:4, nome:"Matheus Tardelli", email:"matheusTard@gmail.com", telefone:"43998006954"},
    {id_colaborador:5, nome:"Geovana Lima", email:"GeovanaLima123@gmail.com", telefone:"43998006954"},
  ]
  filtroDigitado: string = '';
  sugestoes: Colaborador[] = [];
  listaColaboradoresFiltrada: Colaborador[] = [...this.colaboradores];

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) { }
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

  atualizaLista() {

  }

  async excluir(colaborador: any) {

    // var result = await this.confirmSvc.confirm("Deletar este imposto?", "Esta ação não é reversível");
    // if (result) {
    //   this.impostosSvc.deletar(imposto).subscribe((d: any) => {
    //     if (!d) {
    //       return;
    //     } else {
    //       this.toastr.success("Imposto deletado!");
    //       this.atualizaLista();
    //     }
    //   });
    // }
  }
}

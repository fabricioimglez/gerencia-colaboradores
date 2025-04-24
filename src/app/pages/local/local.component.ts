import { Component, ElementRef, HostListener } from '@angular/core';
import { Local } from './model/local';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocalService } from './service/local.service';
import { ToastrService } from 'ngx-toastr';
import { ModalCriarEditarLocalComponent } from './components/modal-criar-editar-local/modal-criar-editar-local.component';


@Component({
  selector: 'app-local',
  standalone: false,
  templateUrl: './local.component.html',
  styleUrl: './local.component.scss'
})
export class LocalComponent {
  locais: Local[] = []
  filtroDigitado: string = '';
  sugestoes: Local[] = [];
  listaLocaisFiltrada: Local[] = []

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private localService: LocalService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.atualizaLista();
  }

  atualizaLista() {
    this.localService.listaLocais().subscribe((r: any) => {
      this.locais = r;
      this.locais.sort((a, b) => a.nome.localeCompare(b.nome));
      this.listaLocaisFiltrada = [...this.locais];
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
      this.sugestoes = this.locais.filter(c =>
        c.nome.toLowerCase().includes(valor) ||
        c.sigla?.toLowerCase().includes(valor)
      );
    } else {
      this.sugestoes = [];
    }
  }

  buscar(): void {
    const valor = this.filtroDigitado.trim().toLowerCase();

    if (!valor) {
      this.listaLocaisFiltrada = [...this.locais];
    } else {
      this.listaLocaisFiltrada = this.locais.filter(c =>
        c.nome.toLowerCase().includes(valor) ||
        c.sigla?.toLowerCase().includes(valor)
      );
      this.listaLocaisFiltrada.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    this.sugestoes = [];
  }

  selecionarSugestao(local: Local): void {
    this.filtroDigitado = local.nome;
    this.buscar();
  }

  criarEditar(local: any = null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = JSON.parse(JSON.stringify(local));


    this.dialog.open(ModalCriarEditarLocalComponent, dialogConfig).afterClosed().subscribe(result => {
      if (!result) {
        return;
      } else {
        this.atualizaLista();
      }
    });
  }

  async excluir(local: any) {
    if (confirm(`Deseja excluir ${local.nome} ? `)) {
      this.localService.excluiLocal(local._id).subscribe((r: any) => {
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../model/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {
  private API_URL = 'http://localhost:3000/colaboradores/';

  constructor(
    private http: HttpClient
  ) {}

  listaColaboradores(): Observable<ColaboradoresService[]> {
    return this.http.get<ColaboradoresService[]>(this.API_URL+"listar-colaboradores");
  }

  criaColaborador(colaborador: Colaborador): Observable<ColaboradoresService> {
    return this.http.post<ColaboradoresService>(this.API_URL+"criar-colaborador", colaborador);
  }

  editaColaborador(id: string, colaborador: Partial<Colaborador>): Observable<any> {
    return this.http.put(this.API_URL+"editar-colaborador/"+id, colaborador);
  }

  excluiColaborador(id: string): Observable<any> {
    return this.http.delete(this.API_URL+"excluir-colaborador/"+id);
  }

}

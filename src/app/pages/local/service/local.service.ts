import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Local } from '../model/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private API_URL = 'http://localhost:3000/local/';

  constructor(
    private http: HttpClient
  ) {}

  listaLocais(): Observable<LocalService[]> {
    return this.http.get<LocalService[]>(this.API_URL+"listar-locais");
  }

  criaLocal(local: Local): Observable<LocalService> {
    return this.http.post<LocalService>(this.API_URL+"criar-local", local);
  }

  editaLocal(id: string, local: Partial<Local>): Observable<any> {
    return this.http.put(this.API_URL+"editar-local/"+id, local);
  }

  excluiLocal(id: string): Observable<any> {
    return this.http.delete(this.API_URL+"excluir-local/"+id);
  }

}
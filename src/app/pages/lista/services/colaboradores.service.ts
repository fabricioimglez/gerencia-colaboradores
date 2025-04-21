import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {
  private API_URL = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) {}

  listaColaboradores(): Observable<ColaboradoresService[]> {
    return this.http.get<ColaboradoresService[]>(this.API_URL);
  }

  consultaColaborador(id: string): Observable<ColaboradoresService> {
    return this.http.get<ColaboradoresService>(`${this.API_URL}/${id}`);
  }

  criaColaborador(colaborador: ColaboradoresService): Observable<ColaboradoresService> {
    return this.http.post<ColaboradoresService>(this.API_URL, colaborador);
  }

  editaColaborador(id: string, colaborador: Partial<ColaboradoresService>): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, colaborador);
  }

  excluiColaborador(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultado } from '../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}
  buscar(busca: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', busca);
    return this.http.get<LivrosResultado>(this.API, { params });
    // .pipe(
    //   tap((retorno) => console.log('Tap', retorno)),
    //   map((resultado) => resultado.items ?? []),
    //   tap((resultado) => console.log('Tap após map', resultado))
    // );
  }
}

import { FormControl } from '@angular/forms';
import { Item, LivrosResultado } from './../../shared/interfaces/interfaces';
import { Component } from '@angular/core';
import {
  catchError,
  debounceTime,
  EMPTY,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { LivroService } from 'src/app/services/livro.service';
import { Livro } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  intervaloMs = 1000;
  busca = new FormControl();
  livrosResultado!: LivrosResultado;
  constructor(private service: LivroService) {}
  livrosEncontrados$ = this.busca.valueChanges.pipe(
    debounceTime(this.intervaloMs),
    filter((valor) => valor.length >= 3),
    switchMap((valor) => this.service.buscar(valor)),
    tap((resposta) => console.log('Resposta', resposta)),
    map((resultado) => (this.livrosResultado = resultado)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.itensParaLivros(items)),
    catchError((erro) => {
      console.log('Erro', erro);
      return EMPTY;
    })
  );
  itensParaLivros(items: Item[]): Livro[] {
    return items.map((item) => {
      return {
        ...item.volumeInfo,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      };
    });
  }
}

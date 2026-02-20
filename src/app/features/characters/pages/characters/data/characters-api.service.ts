import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  DemonSlayerCharacter,
  PagedResponse,
} from '../models/anime-character.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly baseUrl = `${environment.dsApiBase}/api/v1/characters`;

  private http = inject(HttpClient);

  // 1. Refatoração do getCharacters usando HttpParams
  getCharacters(
    page = 1,
    limit = 6,
  ): Observable<PagedResponse<DemonSlayerCharacter>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));

    return this.http.get<PagedResponse<DemonSlayerCharacter>>(this.baseUrl, {
      params,
    });
  }

  // 3. Simplificação do searchCharacterByName
  searchCharacterByName(
    name: string,
  ): Observable<PagedResponse<DemonSlayerCharacter>> {
    const params = new HttpParams().set('name', name);

    return this.http.get<PagedResponse<DemonSlayerCharacter>>(this.baseUrl, {
      params,
    });
  }

  getCharacterById(id: number): Observable<DemonSlayerCharacter> {
    // 1. Criamos o parâmetro de busca ?id=X
    const params = new HttpParams().set('id', id);

    console.log('--- AGORA VAI! ---');
    console.log('URL Base:', this.baseUrl);
    console.log('Buscando com parâmetro ID:', id);

    // 2. Chamamos a baseUrl (sem a barra e o ID no final) passando os params
    // O Angular vai montar: /api/ds/api/v1/characters?id=1
    console.log(params);
    return this.http.get<DemonSlayerCharacter>(this.baseUrl, { params });
  }

  getCombatStyleById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    const url = `${environment.dsApiBase}/api/v1/combat-styles`;

    console.log('Buscando Estilo de Combate para ID:', id);
    return this.http.get<any>(url, { params });
  }
}

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

  searchCharacterByName(
    name: string,
  ): Observable<PagedResponse<DemonSlayerCharacter>> {
    const params = new HttpParams().set('name', name);

    return this.http.get<PagedResponse<DemonSlayerCharacter>>(this.baseUrl, {
      params,
    });
  }

  getCharacterById(id: number): Observable<DemonSlayerCharacter> {
    const params = new HttpParams().set('id', id);

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

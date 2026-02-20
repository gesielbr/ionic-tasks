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

  // 2. Simplificação do getCharacterById
  getCharacterById(
    id: number,
  ): Observable<PagedResponse<DemonSlayerCharacter>> {
    const params = new HttpParams().set('id', String(id));

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
}

import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  getCharacters(page = 1, limit = 6) {
    return this.http.get<PagedResponse<DemonSlayerCharacter>>(
      `${environment.dsApiBase}/api/v1/characters?page=${page}&limit=${limit}`,
    );
  }

  getCharacterById(
    id: number,
  ): Observable<PagedResponse<DemonSlayerCharacter>> {
    const params = new HttpParams().set('id', String(id));
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
}

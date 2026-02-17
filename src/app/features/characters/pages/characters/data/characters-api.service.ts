import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DemonSlayerCharacter,
  PagedResponse,
} from '../models/anime-character.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly baseUrl = '/ds-api/api/v1/characters';

  constructor(private http: HttpClient) {}

  getCharacters(
    page = 1,
    limit = 5,
  ): Observable<PagedResponse<DemonSlayerCharacter>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));

    return this.http.get<PagedResponse<DemonSlayerCharacter>>(this.baseUrl, {
      params,
    });
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

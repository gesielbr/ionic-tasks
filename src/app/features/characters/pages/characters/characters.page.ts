import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonImg,
} from '@ionic/angular/standalone';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { CharactersService } from './data/characters-api.service';
import {
  DemonSlayerCharacter,
  PagedResponse,
} from './models/anime-character.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonImg,
  ],
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  characters: DemonSlayerCharacter[] = [];

  page = 1;
  limit = 6;

  initialLoading = false;
  loadingMore = false;
  infiniteDisabled = false;

  errorMsg = '';

  constructor(private charactersService: CharactersService) {}

  ngOnInit() {
    this.loadCharacters(true);
  }

  trackById(_index: number, item: DemonSlayerCharacter) {
    return item.id;
  }

  imageUrl(c: DemonSlayerCharacter) {
    return c.img || 'https://via.placeholder.com/80';
  }

  loadCharacters(reset = false, infiniteEv?: InfiniteScrollCustomEvent) {
    console.log('API base:', environment.dsApiBase);
    if (this.initialLoading || this.loadingMore) return;

    if (reset) {
      this.page = 1;
      this.characters = [];
      this.errorMsg = '';
      this.infiniteDisabled = false;
      this.initialLoading = true;
    } else {
      this.loadingMore = true;
    }

    this.charactersService.getCharacters(this.page, this.limit).subscribe({
      next: (res: PagedResponse<DemonSlayerCharacter>) => {
        if (!res || !Array.isArray(res.content)) {
          this.errorMsg = 'Resposta inválida da API (não veio JSON esperado).';
          this.initialLoading = false;
          this.loadingMore = false;
          infiniteEv?.target?.complete?.();
          return;
        }

        const list = res.content;

        this.characters = [...this.characters, ...list];
        this.page += 1;

        if (list.length === 0 || list.length < this.limit) {
          this.infiniteDisabled = true;
        }
      },

      error: () => {
        this.errorMsg = 'Falha ao carregar personagens. Tenta novamente.';
        this.initialLoading = false;
        this.loadingMore = false;
        infiniteEv?.target?.complete?.();
      },
      complete: () => {
        this.initialLoading = false;
        this.loadingMore = false;
        infiniteEv?.target?.complete?.();
      },
    });
  }

  loadMore(ev: Event) {
    this.loadCharacters(false, ev as InfiniteScrollCustomEvent);
  }

  getAffiliationLabel(c: any): string {
    switch (c.affiliation_id) {
      case 1:
        return 'Corps';
      case 2:
        return 'Hashira';
      case 3:
        return 'Demon';
      default:
        return 'Unknown';
    }
  }

  getAffiliationClass(c: any): string {
    switch (c.affiliation_id) {
      case 1:
        return 'affiliation-corps';
      case 2:
        return 'affiliation-hashira';
      case 3:
        return 'affiliation-demon';
      default:
        return 'affiliation-unknown';
    }
  }

  getAffiliationCardClass(c: any): string {
    switch (c.affiliation_id) {
      case 1:
        return 'affiliation-corps-card';
      case 2:
        return 'affiliation-hashira-card';
      case 3:
        return 'affiliation-demon-card';
      default:
        return 'affiliation-unknown-card';
    }
  }
}

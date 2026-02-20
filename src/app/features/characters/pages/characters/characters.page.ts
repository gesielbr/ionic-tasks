import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { CharactersService } from './data/characters-api.service';
import {
  DemonSlayerCharacter,
  PagedResponse,
} from './models/anime-character.model';
import { Router } from '@angular/router';

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
  private charactersService = inject(CharactersService);
  private router = inject(Router);

  public characters = signal<DemonSlayerCharacter[]>([]);

  public initialLoading = signal(false);

  page = 1;
  limit = 6;
  loadingMore = false;
  infiniteDisabled = false;
  errorMsg = '';

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
    if (this.initialLoading() || this.loadingMore) return; // Note que initialLoading agora é uma função ()

    if (reset) {
      this.page = 1;
      this.characters.set([]); // Limpa o "balde com sensor"
      this.errorMsg = '';
      this.infiniteDisabled = false;
      this.initialLoading.set(true); // Liga o sensor de carregamento
    } else {
      this.loadingMore = true;
    }

    this.charactersService.getCharacters(this.page, this.limit).subscribe({
      next: (res: PagedResponse<DemonSlayerCharacter>) => {
        const list = res.content;

        this.characters.update((current) => [...current, ...list]);

        this.page += 1;

        if (list.length === 0 || list.length < this.limit) {
          this.infiniteDisabled = true;
        }
      },

      error: () => {
        this.errorMsg = 'Falha ao carregar personagens.';
        this.initialLoading.set(false);
        this.loadingMore = false;
        infiniteEv?.target?.complete?.();
      },
      complete: () => {
        this.initialLoading.set(false);
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

  goToDetails(id: number) {
    this.router.navigate(['/characters', id]);
  }
}

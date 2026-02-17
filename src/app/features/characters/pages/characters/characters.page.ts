import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';

import { CharactersService } from './data/characters-api.service';
import {
  DemonSlayerCharacter,
  PagedResponse,
} from './models/anime-character.model';

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
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  ],
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  characters: DemonSlayerCharacter[] = [];

  page = 1;
  limit = 6;
  loading = false;
  errorMsg = '';

  constructor(private charactersService: CharactersService) {}

  ngOnInit() {
    this.loadCharacters(true);

    // debug (depois remove)
    this.charactersService.getCharacters(1, 5).subscribe(console.log);
  }

  trackById(_index: number, item: DemonSlayerCharacter) {
    return item.id;
  }

  imageUrl(c: DemonSlayerCharacter) {
    return c.img || 'https://via.placeholder.com/80';
  }

  loadCharacters(reset = false) {
    if (this.loading) return;

    if (reset) {
      this.page = 1;
      this.characters = [];
      this.errorMsg = '';
    }

    this.loading = true;

    this.charactersService.getCharacters(this.page, this.limit).subscribe({
      next: (res: PagedResponse<DemonSlayerCharacter>) => {
        const list = res?.content ?? [];
        this.characters = [...this.characters, ...list];
        this.page += 1;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Falha ao carregar personagens. Tenta novamente.';
        this.loading = false;
      },
    });
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
}

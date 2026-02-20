import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemonSlayerCharacter } from '../characters/models/anime-character.model';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonSpinner,
  IonBadge,
  IonButtons,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../characters/data/characters-api.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    FormsModule,
    IonSpinner,
    IonBadge,
  ],
})
export class CharacterDetailPage implements OnInit {
  private charactersService = inject(CharactersService);
  private route = inject(ActivatedRoute);

  public character = signal<DemonSlayerCharacter | null>(null);
  public loading = signal(true);
  public combatStyle = signal<any>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading.set(true);
      this.charactersService.getCharacterById(Number(id)).subscribe({
        next: (res: any) => {
          const charData = res.content ? res.content[0] : res;
          console.log('DADOS DO PERSONAGEM:', charData); // <--- OLHE AQUI NO CONSOLE
          this.character.set(charData);

          // Busca o Estilo de Combate (usando o ID do personagem ou um campo específico se existir)
          if (charData) {
            this.charactersService.getCombatStyleById(charData.id).subscribe({
              next: (styleRes: any) => {
                this.combatStyle.set(
                  styleRes.content ? styleRes.content[0] : styleRes,
                );
              },
            });
          }
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    }
  }

  getAffiliationLabel(c: any): string {
    if (!c) return 'Unknown';
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
    if (!c) return 'affiliation-unknown';
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

  getArcName(id: number | undefined): string {
    // Debug temporário para você ver o que está chegando
    if (id === undefined) {
      console.warn('getArcName recebeu undefined!');
    } else {
      console.log('getArcName recebeu o ID:', id);
    }

    if (!id) return 'Unknown Arc';

    const arcs: Record<number, string> = {
      1: 'Final Selection Arc',
      2: 'First Mission Arc',
      3: 'Asakusa Arc',
      4: 'Tsuzumi Mansion Arc',
      5: 'Mount Natagumo Arc',
      6: 'Rehabilitation Training Arc',
      7: 'Mugen Train Arc',
      8: 'Entertainment District Arc',
      9: 'Swordsmith Village Arc',
      10: 'Hashira Training Arc',
      11: 'Infinity Castle Arc',
    };

    return arcs[id] || `Arc ${id}`;
  }
}

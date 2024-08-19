import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardContentComponent } from './card-content/card-content.component';
import { CardIconComponent } from './card-icon/card-icon.component';
import { CardTitleComponent } from './card-title/card-title.component';
import { CardComponent } from './card.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CardComponent, CardContentComponent, CardIconComponent, CardTitleComponent],
  exports: [CardComponent, CardContentComponent, CardIconComponent, CardTitleComponent],
})
export class CardModule {}

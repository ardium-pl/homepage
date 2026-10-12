import { Component } from '@angular/core';
import { ArdIconBaggage, ArdIconReceipt, ArdIconScale, ArdIconShieldCheck, ArdIconWrench } from '@ardium-ui/icons';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';

@Component({
  selector: 'app-how-we-work-section',
  standalone: true,
  imports: [
    CardModule,
    PreHeadingComponent,
    ArdIconBaggage,
    ArdIconWrench,
    ArdIconShieldCheck,
    ArdIconScale,
    ArdIconReceipt,
  ],
  templateUrl: './how-we-work.section.html',
  styleUrl: './how-we-work.section.scss',
})
export class HowWeWorkSection {}

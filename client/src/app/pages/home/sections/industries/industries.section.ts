import { Component } from '@angular/core';
import { ArdIconBaggage, ArdIconReceipt, ArdIconScale, ArdIconShieldCheck, ArdIconWrench } from '@ardium-ui/icons';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';

@Component({
  selector: 'app-industries-section',
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
  templateUrl: './industries.section.html',
  styleUrl: './industries.section.scss',
})
export class IndustriesSection {}

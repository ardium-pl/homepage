import { Component } from '@angular/core';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';
import { ArdIconDatabaseAi } from "../../../../icons/database-ai.icon";
import { ArdIconMessageEllipsis } from "../../../../icons/message-ellipsis.icon";
import { ArdIconScanAi } from "../../../../icons/scan-ai.icon";

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardModule, PreHeadingComponent, ArdIconScanAi, ArdIconDatabaseAi, ArdIconMessageEllipsis],
  templateUrl: './services.section.html',
  styleUrl: './services.section.scss',
})
export class ServicesSection {}

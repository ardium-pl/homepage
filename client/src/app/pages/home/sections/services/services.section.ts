import { Component } from '@angular/core';
import { CardModule } from '@components/card';
import { PreHeadingComponent } from '@components/pre-heading';
import { BrainCpuIcon } from '../../../../icons/brain-cpu.icon';
import { DocumentSpreadsheetIcon } from '../../../../icons/document-spreadsheet.icon';
import { MonitorCodeIcon } from '../../../../icons/monitor-code.icon';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardModule, PreHeadingComponent, MonitorCodeIcon, DocumentSpreadsheetIcon, BrainCpuIcon],
  templateUrl: './services.section.html',
  styleUrl: './services.section.scss',
})
export class ServicesSection {}

import { Routes } from '@angular/router';
import { HomePage } from '@pages/home';
import { AboutPage } from '@pages/about';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: '**', redirectTo: '' },
];

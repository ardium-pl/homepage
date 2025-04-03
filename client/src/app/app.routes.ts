import { Routes } from '@angular/router';
import { AboutPage } from '@pages/about';
import { HomePage } from '@pages/home';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: '**', redirectTo: '' },
];

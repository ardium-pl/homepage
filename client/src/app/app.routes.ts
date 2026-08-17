import { Routes } from '@angular/router';
import { AboutPage } from '@pages/about';
import { BlogPage } from '@pages/blog';
import { BlogPostPage } from '@pages/blog-post';
import { HomePage } from '@pages/home';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: 'blog', component: BlogPage },
  { path: 'blog/:slug', component: BlogPostPage },
  { path: '**', redirectTo: '' },
];

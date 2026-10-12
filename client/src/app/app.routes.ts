import { Routes } from '@angular/router';
import { AboutPage } from '@pages/about';
import { BlogPage } from '@pages/blog';
import { BlogPostPage } from '@pages/blog-post';
import { FaqPage } from '@pages/faq/faq.page';
import { HomePage } from '@pages/home';
import { PrivacyPolicyPage } from '@pages/privacy-policy';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: 'blog', component: BlogPage },
  { path: 'blog/:slug', component: BlogPostPage },
  { path: 'faq', component: FaqPage },
  { path: 'privacy-policy', component: PrivacyPolicyPage },
  { path: '**', redirectTo: '' },
];

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'register/:id',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'empresa/:uid',
    loadChildren: () => import('./pages/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'subcategory',
    loadChildren: () => import('./pages/subcategory/subcategory.module').then( m => m.SubcategoryPageModule)
  },
  {
    path: 'detail-request/:id',
    loadChildren: () => import('./pages/detail-request/detail-request.module').then( m => m.DetailRequestPageModule)
  },
  {
    path: 'quotes',
    loadChildren: () => import('./pages/quotes/quotes.module').then( m => m.QuotesPageModule)
  },
  {
    path: 'quotes-sent',
    loadChildren: () => import('./pages/quotes-sent/quotes-sent.module').then( m => m.QuotesSentPageModule)
  },
  {
    path: 'quotes-accepted',
    loadChildren: () => import('./pages/quotes-accepted/quotes-accepted.module').then( m => m.QuotesAcceptedPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'quote-detail',
    loadChildren: () => import('./pages/quote-detail/quote-detail.module').then( m => m.QuoteDetailPageModule)
  },
  {
    path: 'info-buyer/:id',
    loadChildren: () => import('./pages/info-buyer/info-buyer.module').then( m => m.InfoBuyerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

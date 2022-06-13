import { LinkTableComponent } from './app/link-table.component';
import { LinkTableRouterComponent } from './link-table-router.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LinkTableRouterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app',
      },
      {
        path: 'app',
        component: LinkTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkTableRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyComponent } from './pages/proy/proy.component';
import { PaoComponent } from './pages/pao/pao.component';
import { ItemComponent } from './pages/item/item.component';
import { EodComponent } from './pages/eod/eod.component';

const routes: Routes = [
  { path: 'proy', component: ProyComponent, data: { titulo: 'Proyectos' } },
  { path: 'pao', component: PaoComponent, data: { titulo: 'PaoComponent' } },
  { path: 'item', component: ItemComponent, data: { titulo: 'ItemComponent' } },
  { path: 'eod', component: EodComponent, data: { titulo: 'EodComponent' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

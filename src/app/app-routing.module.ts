import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';

const routes: Routes = [

  { path: '', component: HomeComponent, data: { title: 'Página Inicial' } },
  { path: 'colaboradores', component: ListaComponent, data: { title: 'Lista de colaboradores' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

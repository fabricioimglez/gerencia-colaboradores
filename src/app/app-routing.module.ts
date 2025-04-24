import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { LocalComponent } from './pages/local/local.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Página Inicial' } },
  { path: 'colaboradores', component: ListaComponent, canActivate: [AuthGuard], data: { title: 'Lista de colaboradores' } },
  { path: 'local', component: LocalComponent, canActivate: [AuthGuard], data: { title: 'Lista de locais' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

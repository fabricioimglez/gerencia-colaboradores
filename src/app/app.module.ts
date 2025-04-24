import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { ModalCriarEditarComponent } from './pages/lista/components/modal-criar-editar/modal-criar-editar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './pages/login/login.component';
import { LocalComponent } from './pages/local/local.component';
import { ModalCriarEditarLocalComponent } from './pages/local/components/modal-criar-editar-local/modal-criar-editar-local.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaComponent,
    ModalCriarEditarComponent,
    LoginComponent,
    LocalComponent,
    ModalCriarEditarLocalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

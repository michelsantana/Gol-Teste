import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule, ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DateTimeFormatPipe } from './_helpers/DateTimeFormat.pipe';

import { AppComponent } from './app.component';
import { ListarAeronavesComponent } from './listar-aeronaves/listar-aeronaves.component';
import { NavComponent } from './nav/nav.component';
import { ListarPassageirosComponent } from './listar-passageiros/listar-passageiros.component';

@NgModule({
   declarations: [
      AppComponent,
      ListarAeronavesComponent,
      NavComponent,
      DateTimeFormatPipe,
      ListarPassageirosComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      TooltipModule.forRoot(),
      BsDatepickerModule.forRoot()
   ],
   providers: [
      DateTimeFormatPipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

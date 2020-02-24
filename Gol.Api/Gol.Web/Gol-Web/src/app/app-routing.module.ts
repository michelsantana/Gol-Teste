import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListarAeronavesComponent } from './listar-aeronaves/listar-aeronaves.component';
import { ListarPassageirosComponent } from './listar-passageiros/listar-passageiros.component';



const routes: Routes = [
  { path: 'aeronaves', component: ListarAeronavesComponent },
  { path: 'passageiros', component: ListarPassageirosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

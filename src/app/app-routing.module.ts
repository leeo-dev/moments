import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentComponent } from './components/moment/moment.component';
import { AboutComponent } from './pages/about/about.component';
import { EditMomentComponent } from './pages/edit-moment/edit-moment.component';
import { HomeComponent } from './pages/home/home.component';
import { NewMomentComponent } from './pages/new-moment/new-moment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'moments/new', component: NewMomentComponent},
  {path: 'moments/edit/:id', component: EditMomentComponent},
  {path: 'moments/:id', component: MomentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

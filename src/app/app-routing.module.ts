import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleRecordingComponent } from './simple-recording/simple-recording.component';

const routes: Routes = [
  { path: 'simple', pathMatch: 'full', component: SimpleRecordingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

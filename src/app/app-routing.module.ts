import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleRecordingComponent } from './simple-recording/simple-recording.component';
import { SimplePlaybackComponent } from './simple-playback/simple-playback.component';
import { SimplePlaybackHarkComponent } from './simple-playback-hark/simple-playback-hark.component';

const routes: Routes = [
  { path: 'simple', pathMatch: 'full', component: SimpleRecordingComponent },
  { path: 'playback', pathMatch: 'full', component: SimplePlaybackComponent },
  { path: 'hark', pathMatch: 'full', component: SimplePlaybackHarkComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

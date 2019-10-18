import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ObservableComponent} from './observable/observable.component';
import {ReplaySubjectComponent} from './replay-subject/replay-subject.component';
import {SubjectComponent} from './subject/subject.component';
import {OperatorsComponent} from './operators/operators.component';


const routes: Routes = [
  {path: 'observable', component: ObservableComponent},
  {path: 'subject', component: SubjectComponent},
  {path: 'replay-subject', component: ReplaySubjectComponent},
  {path: 'operators', component: OperatorsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

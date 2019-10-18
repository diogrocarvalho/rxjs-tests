import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RxJS Samples';

  constructor(private router: Router) {
  }

  public gotoFibonacci() {
    const url = 'observable';
    this.router.navigate([url]);
  }

  public gotoSubject(){
    const url = 'subject';
    this.router.navigate([url]);
  }

  public gotoReplaySubject(){
    const url = 'replay-subject';
    this.router.navigate([url]);
  }
}

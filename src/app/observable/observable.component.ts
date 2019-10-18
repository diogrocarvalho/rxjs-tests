import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
  values: number[];
  valuesObservableSecondTime: number[];
  constructor() {
    this.values = [];
    this.valuesObservableSecondTime = [];
  }

  ngOnInit() {
    this.handleObservableCase();
  }

  handleObservableCase() {
    const that = this;
    const values$ = new Observable(this.valueObservable);

    // Creates observer with next and complete handler functions
    const observer = {
      next(num: number) {
        that.values.push(num);
      },
      complete() {
        console.log('Finish');
      }
    };

    // Creates observer with next and complete handler functions
    const observer2 = {
      next(num: number) {
        that.valuesObservableSecondTime.push(num);
      },
      complete() {
        console.log('Finish 2');
      }
    };

    //subscribe to observable
    values$.subscribe(observer);

    //subscribe to observable after 2 secs
    setTimeout(() => {
      values$.subscribe(observer2);
    }, 2000);
  }

  valueObservable(observer) {
    const limit = 20;
    const counter = 0;
    const ms = 1000;
    let timeoutId;

    // calculates and emits a fibonacci number after ms
    function calculateFibonacci(c, p, count) {
      // creates a timeout
      timeoutId = setTimeout(() => {
        if (count < 2) {
          // emit value
          observer.next(1);
          calculateFibonacci(1, 1, ++count);
        } else {
          if (limit > count) {
            const aux = c;
            c += p;
            p = aux;
            // emit value
            observer.next(c);
            calculateFibonacci(c, p, ++count);
          } else {
            // emit value
            observer.next(c + p);
            // finishes calc
            observer.complete();
          }
        }
      }, ms);
    }
    calculateFibonacci(1, 0, counter);

    return {
      unsubscribe() {
        // remove timeout
        clearTimeout(timeoutId);
      }
    };
  }
}

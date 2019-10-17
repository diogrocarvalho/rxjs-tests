import {Component, OnInit} from '@angular/core';
import {Observable, from, of, Subject} from 'rxjs';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent implements OnInit {
  values: number[];
  valuesObservableSecondTime: number[];
  valuesSubject: number[];
  valuesSubject2: number[];
  valuesOf: number[];
  valuesFrom: number[];

  constructor() {
    this.values = [];
    this.valuesObservableSecondTime = [];
    this.valuesSubject = [];
    this.valuesSubject2 = [];
  }

  ngOnInit() {
    this.handleSubjectCase();
    this.handleObservableCase();
  }

  handleSubjectCase() {
    const subject = new Subject<number>();

    subject.subscribe(value => {
      this.valuesSubject.push(value);
    });

    this.emitSubjectValueBySecs(subject);

    setTimeout(() => {
      subject.subscribe(value => {
        this.valuesSubject2.push(value);
      });
    }, 5000);

  }

  emitSubjectValueBySecs(subject) {
    let count = 1;
    setInterval(() => {
      subject.next(count++);
      if (count === 20) {
        subject.complete();
      }
    }, 1000);
  }

  handleObservableCase() {
    const that = this;
    const values$ = new Observable(this.valueObservable);
    const observer = {
      next(num: number) {
        that.values.push(num);
      },
      complete() {
        console.log('Finish');
      }
    };

    const observer2 = {
      next(num: number) {
        that.valuesObservableSecondTime.push(num);
      },
      complete() {
        console.log('Finish 2');
      }
    };

    values$.subscribe(observer);
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

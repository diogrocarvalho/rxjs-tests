import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  values: number[];
  values2: number[];

  constructor() {
    this.values = [];
    this.values2 = [];
  }

  ngOnInit() {
    this.handleSubjectCase();
  }

  handleSubjectCase() {
    const subject = new Subject<number>();

    subject.subscribe(value => {
      this.values.push(value);
    });

    this.emitSubjectValueBySecs(subject);

    setTimeout(() => {
      subject.subscribe(value => {
        this.values2.push(value);
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
}

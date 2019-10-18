import {Component, OnInit} from '@angular/core';
import {from} from 'rxjs';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {
  values: number[];
  doubles: number[];
  filtered: number[];
  pipedValues: number[];

  constructor() {
    this.values = [];
    this.doubles = [];
    this.filtered = [];
    this.pipedValues = [];
  }

  ngOnInit() {
    for (let i = 1; i <= 50; ++i) {
      this.values.push(i);
    }
    this.doubleValues();
    this.filterValues();
    this.pipeValues();
  }

  doubleValues() {
    const double$ = from(this.values).pipe(map(num => num * 2));
    const that = this;
    double$.subscribe((num) => {
      that.doubles.push(num);
    });
  }

  filterValues() {
    const filter$ = from(this.values).pipe(filter(num => num % 2 === 0));
    const that = this;
    filter$.subscribe((num) => {
      that.filtered.push(num);
    });
  }

  pipeValues() {
    const pipe$ = from(this.values).pipe(
      filter(num => num % 2 === 0),
      map(num => num * num)
    );

    const that = this;

    pipe$.subscribe((num) => {
      that.pipedValues.push(num);
    }, () => {
      console.log('piped error');
    }, () => {
      console.log('piped completed');
    });
  }
}

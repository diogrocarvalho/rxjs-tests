import { Component, OnInit } from '@angular/core';
import {ReplaySubject} from 'rxjs';
@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.scss']
})
export class ReplaySubjectComponent implements OnInit {
  values: number[];
  values2: number[];

  constructor() {
    this.values = [];
    this.values2 = [];
  }

  ngOnInit() {
    this.handleReplaySubjectCase();
  }

  handleReplaySubjectCase(){
    // Creates a ReplaySubject object that will keep last 3 emitted values
    const replaySubject = new ReplaySubject(2)
    const that = this;
    let count = 1;

    setInterval(()=>{
      replaySubject.next(count++)
      if(count > 20)      replaySubject.complete()
    },1000);

    replaySubject.subscribe((num: number) =>{
      that.values.push(num)
    });

    setTimeout(()=>{
      replaySubject.subscribe((num: number) =>{
        that.values2.push(num)
      })
    },5000)


  }

}

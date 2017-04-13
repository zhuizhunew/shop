/**
 * Created by zhuzhui on 2017/3/1.
 */
import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'custom-counter',
  templateUrl: 'counter.html'
})


export class Counter {
  Value;
  @Output() counterChange = new EventEmitter();

  constructor() {

  }

  @Input()
  get counter() {
    return this.Value;
  }

  set counter(value) {
    this.Value = value;
    this.counterChange.emit(Number(this.Value));
  }

  decrement() {
    if (this.counter <= 1) {
      return;
    }
    this.counter--;
  }

  increment() {
    this.counter++;
  }
}

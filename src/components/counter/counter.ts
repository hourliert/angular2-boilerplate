import {Component, View} from 'angular2/angular2';
import {CounterService} from '../../services';
const template: string = require('./counter.html');

@Component({
  selector: 'counter',
  providers: [CounterService],
  properties: [
    'counter'
  ]
})
@View({
  template: template
})
export class Counter {
  counter: number;
  
  constructor(private counterService: CounterService) {
    this.counter = this.counter || 0;
  }
  
  increment() {
    this.counter++;
    this.counterService.addCount(this.counter);
  }
}
import { Injectable } from 'angular2/angular2';

@Injectable()
export class CounterService {
  countHistory: number[];
  
  constructor() {
    this.countHistory = [];
  }
  
  addCount(value) {
    this.countHistory.push(value);
    console.log('History', this.countHistory);
  }
}
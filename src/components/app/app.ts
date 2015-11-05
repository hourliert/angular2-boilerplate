import { Component } from 'angular2/angular2';
import { Counter } from '../counter/counter';

const template: string = require('./app.html');
const styles: string = require('./app.css');

@Component({
  selector: 'app',
  template: template,
  styles: [styles],
  directives: [Counter]
})
export class AppComponent {
  public name: string;

  constructor() {
    this.name = 'Thomas Hourlier';
  }
}

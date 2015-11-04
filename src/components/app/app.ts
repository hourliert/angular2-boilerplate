import {Component} from 'angular2/angular2';
const template: string = require('./app.html');
const styles: string = require('./app.css');

@Component({
  selector: 'app',
  template: template, styles: [styles]
})
export class AppComponent {
  public name: string;

  constructor() {
    this.name = 'Thomas Hourlier';
  }
}

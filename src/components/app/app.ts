import {Component} from 'angular2/angular2';
const template = require('./app.html');
const styles = require('./app.css');

@Component({selector: 'app', template: template, styles: [styles]})
export class AppComponent {
  name: string;

  constructor() { this.name = 'Thomas Hourlier'; }
}

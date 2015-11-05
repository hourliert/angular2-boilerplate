import 'es6-shim';

import {bootstrap} from 'angular2/angular2';
import {AppComponent} from './components';

import {CounterService} from './services';

bootstrap(AppComponent, [
  CounterService
]);

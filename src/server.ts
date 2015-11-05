import 'es6-shim';

import { join } from 'path';
import * as express from 'express';
// import { ng2engine } from 'angular2-universal-preview';
// import { AppComponent } from './components';

import {SERVER_PORT, SERVER_RENDERING} from './config';

const app: express.Express = express();
const port: number = SERVER_PORT;

app.set('port', (process.env.PORT || port));
app.use('/client', express.static(join(__dirname, './client')));
if (SERVER_RENDERING) {
  // app.engine('.ng2.html', ng2engine);
  // app.set('views', __dirname);
  // app.set('view engine', 'ng2.html');
  // app.use('/', (req, res) => {
  //   res.render('index', { AppComponent });
  // });
  // todo: not yet implemented
} else {
  app.use((req: express.Request, res: express.Response) => {
    res.sendFile(join(__dirname, 'index.ng2.html'));
  });
}

app.listen(port, (error: express.ErrorRequestHandler) => {
  if (error) {
    console.log(error);
  } else {
    console.log('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    if (process.send) {
      process.send('online');
    }
  }
});

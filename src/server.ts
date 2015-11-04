import 'babel-core/polyfill';

import * as path from 'path';
import * as express from 'express';
// import { ng2engine } from 'angular2-universal-preview';
// import { AppComponent } from './components';

import {SERVER_PORT, SERVER_RENDERING} from './config';

const app: express.Express = express();
const port: number = SERVER_PORT;

/**
 * Render the "index.html"
 * @param  {string} html         The rendererd DOM. Or anything...
 * @param  {Object} initialState The initial redux app state.
 * @return {string}              "index.html"
 */
function renderFullPage(html: string): string {
  'use strict';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Angular2 Boilerplate</title>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Angular2 Boilerplate">
        <!-- base url -->
        <!--<base href="/">-->
      </head>
      <body>
        <app>
          ${html}
        </app>

        <!-- Common files to be cached -->
        <script src="/client/common.js"></script>
        <!-- Angular2 files -->
        <script src="/client/angular2.js"></script>
        <!-- App script -->
        <script src="/client/app.js"></script>
      </body>
    </html>
  `;
}

app.set('port', (process.env.PORT || port));
app.use('/client', express.static(path.join(__dirname, './client')));
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
    res.status(200).send(renderFullPage('Loading without server rendering...'));
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

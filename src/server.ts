import 'babel-core/polyfill';

import * as path from 'path';
import * as express from 'express';

import { SERVER_PORT, SERVER_RENDERING } from './config';

const app = express();
const port = SERVER_PORT;

/**
 * Render the "index.html"
 * @param  {string} html         The rendererd DOM. Or anything...
 * @param  {Object} initialState The initial redux app state.
 * @return {string}              "index.html"
 */
function renderFullPage(html) {
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
        <my-app>
          ${html}
        </my-app>
        
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
  // Not implemented yet
} else {
  app.use((req, res) => {
    res.status(200).send(renderFullPage('Loading without server rendering...'));
  });
}

app.listen(port, (error) => {
  if (error) {
    console.info(error); // eslint-disable-line no-console
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port); // eslint-disable-line no-console
    if (process.send) {
      process.send('online');
    }
  }
});

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as https from 'https';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

const app: express.Application = express();
const port = 4000;

app.use('/dist', express.static(__dirname + '/dist'));
app.use(bodyParser.json());

app.get('/', (_, res) => res.sendFile(__dirname + '/index.html'));

app.listen(port, (error: string) => error
	? console.error(error)
	: console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
)
// @flow

'use strict';

import type { $Request, $Response } from 'express';

const express = require('express');
const path = require('path');

const app = express();

const port = 4000;
app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.get('/', (_: $Request, res: $Response) => res.sendFile(path.join(__dirname, '/index.html')));

app.listen(port, () => console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port));

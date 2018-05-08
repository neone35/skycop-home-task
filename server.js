// Only ES5 (old) is allowed in this file, but ES6 can be used in required files
const getRootUrl = require('./getRootUrl');

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const ROOT_URL = getRootUrl();

app.prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err; // eslint-disable-next-line no-console
      console.log(`> Ready on ${ROOT_URL}`);
    });
  })
  .catch((ex) => { // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });

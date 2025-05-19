const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const bcrypt = require('bcryptjs');
const app = express();
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const {PrismaClient} = require('./generated/prisma/client');

app.use(
    session({
      cookie: {
       maxAge: 7 * 24 * 60 * 60 * 1000 // ms
      },
      secret: 'a santa at nasa',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
        new PrismaClient(),
        {
          checkPeriod: 2 * 60 * 1000,  //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }
      )
    })
);
app.use(express.urlencoded({ extended: true }));
//app.use('/',xRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
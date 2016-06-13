#!/usr/bin/env node

const server = require('../server/server').server;
const job    = require('../server/server').cron;

job.start();
server.listen(process.env.PORT || 3000);

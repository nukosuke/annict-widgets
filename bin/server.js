#!/usr/bin/env node

const server = require('../server/server');
server.listen(process.env.PORT || 3000);

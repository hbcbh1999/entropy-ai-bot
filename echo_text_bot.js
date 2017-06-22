'use strict';
/*
 * Wire
 * Copyright (C) 2017 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

const path = require('path');
const fs = require('fs');
const service = require('./lib/service');
var _ = require('underscore');
const DIR_CERT = 'cert/'

// a simple echo bot which sends back text messages it receives
console.log('auth token:'+process.env.WIRE_BOT_AUTHTOKEN);

var ca = [];
var chain = fs.readFileSync(DIR_CERT+"fullchain.pem", 'utf8');
chain = chain.split('\n');
var cert = [];
var key, line;
_.forEach(chain,function(line){
  cert.push(line);
  if(line.length !== 0 && line.match(/-END CERTIFICATE-/)){
    ca.push(cert.join("\n"));
    cert = [];
  }
});

service.createService({
  port: 3000,
  ca: ca,
  key: DIR_CERT+'privkey.pem',
  cert: DIR_CERT+'cert.pem',
  storePath: path.join(__dirname, 'store'),
  auth: process.env.WIRE_BOT_AUTHTOKEN,
}, (bot) => {
  console.log(`Bot instance created ${bot.botID}`);
  bot.on('message', (from, message) => {
    console.log(`Got message from ${from} text: ${message.text}`);
    bot.sendMessage(message.text.content, (sendStatus) => {
      console.log(`message successfully sent with status ${sendStatus}`);
    });
  });
  bot.on('join', (members, conversation) => {
    console.log(`New members ${members} joined conversation ${conversation.id}`);
  });
  bot.on('leave', (members, conversation) => {
    console.log(`Members ${members} have left conversation ${conversation.id}`);
  });
  bot.on('rename', (name, conversation) => {
    console.log(`Conversation ${conversation.id} renamed to ${name}`);
  });
});

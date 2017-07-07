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
require('dotenv').config();
const service = require('./lib/service');
// var _ = require('underscore');
// const DIR_CERT = 'cert/'

console.log('auth token:'+process.env.WIRE_BOT_AUTHTOKEN);

service.createService({
  port: 3000,
  // ca: ca,
  // key: DIR_CERT+'privkey.pem',
  // cert: DIR_CERT+'cert.pem',
  storePath: path.join(__dirname, 'store'),
  auth: process.env.WIRE_BOT_AUTHTOKEN,
}, (bot) => {
  console.log(`Bot instance created ${bot.botID}`);
  // this sends the message (to Entropy)
  bot.on('message', (from, message) => {
    console.log(`Got message from ${from} text: ${JSON.stringify(message.text)}`);
    bot.onWireMessage(message.text.content, (sendStatus) => {
      console.log(`message successfully sent with status ${sendStatus}`);
    });
    // TODO: need to remove below echo
    console.log('WARNING: NEED TO REMOVE DEFAULT ECHO!!!!')
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
  //this forward's entropy's response/message to App client (from Entropy)
  bot.on('entropy-message', (from,message) => {
    console.log(`ready to send entropy.ai bot message`);
    bot.sendMessage(message, (sendStatus) => {
      console.log(`Entropy message successfully forwarded with status ${sendStatus}`);
    });
  });
});

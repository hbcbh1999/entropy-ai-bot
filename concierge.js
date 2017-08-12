'use strict';
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const _ = require('lodash');
const service = require('./lib/service');
const NEW_CLIENT_MESSAGE_STRING = '<<new_client>>';
// var _ = require('underscore');
// const DIR_CERT = 'cert/'

console.log('environment vars:');
console.log('auth token:'+process.env.WIRE_BOT_AUTHTOKEN);
console.log(process.env.ENTROPY_HOSTNAME);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(process.env.NODE_ENV);

service.createService({
  port: 3000,
  // ca: ca,
  // key: DIR_CERT+'privkey.pem',
  // cert: DIR_CERT+'cert.pem',
  storePath: path.join(((process.env.NODE_ENV == 'production') ? '/tmp' : process.env.HOME),'wire-store'),
  // path.join(__dirname, 'store')
  auth: process.env.WIRE_BOT_AUTHTOKEN,
}, (bot) => {
  console.log(`Bot instance created ${bot.botID}`);
  // this sends the message (to Entropy)
  bot.on('message', (from, message) => {
    console.log(`Got message from ${from} text: ${JSON.stringify(message.text)}`);
    bot.forwardWireMessage(message.text.content, from, (sendStatus) => {
      console.log(`message successfully sent with status ${sendStatus}`);
    });
    // TODO: need to remove below echo
    // console.log('WARNING: NEED TO REMOVE DEFAULT ECHO!!!!')
    // bot.sendMessage(message.text.content, (sendStatus) => {
    //   console.log(`message successfully sent with status ${sendStatus}`);
    // });
  });
  bot.on('join', (members, conversation) => {
    console.log(`New members ${members} joined conversation ${conversation.id}`);
    var member = _.head(members);
    bot.forwardWireMessage(NEW_CLIENT_MESSAGE_STRING, member, (sendStatus) => {
      console.log(`notified entropy of a new user ${sendStatus}`);
    });
  });
  bot.on('leave', (members, conversation) => {
    console.log(`Members ${members} have left conversation ${conversation.id}`);
  });
  bot.on('rename', (name, conversation) => {
    console.log(`Conversation ${conversation.id} renamed to ${name}`);
  });
  //this forward's entropy's response/message to App client (from Entropy)
  bot.on('entropy-message', (to_recipient,message) => {
    console.log(`ready to send entropy.ai bot message`);
    // bot.sendMessageDirect(message,to_recipient,(sendStatus) => {
    bot.sendMessage(message,(sendStatus) => {
      console.log(`Entropy message successfully forwarded with status ${sendStatus}`);
    });
  });
});

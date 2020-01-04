const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const msgQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  } else {
    // var moves = ['left', 'right', 'up', 'down'];
    // var randomIdx = Math.floor(Math.random() * 4);
    // var move = moves[randomIdx]
    // Check to make sure it is not undefined
    var message = msgQueue.dequeue();
    if (message !== undefined) {
      console.log(msgQueue);
      res.writeHead(200, headers);
      res.write(message);
      res.end();
    } else {
      res.writeHead(204, headers);
      res.end();
    }
    next(); // invoke next() at the end of a request to help with testing!
  }
};

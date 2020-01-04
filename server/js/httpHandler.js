const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const msgQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////
// backgroundImageFile defaults to background.jpg

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
  }

  if (req.method === 'GET') {
    if (req.url === "/") {
      var message = msgQueue.dequeue();
      if (message !== undefined) {
        res.writeHead(200, headers);
        res.write(message);
        res.end();
        next();
      } else {
        res.writeHead(200, headers);
        res.end();
        next();
      }
    } else {
      res.writeHead(404, headers);
      res.end();
      next();
    }
  }
    // var moves = ['left', 'right', 'up', 'down'];
    // var randomIdx = Math.floor(Math.random() * 4);
    // var move = moves[randomIdx]
    // Check to make sure it is not undefined
  // next(); // invoke next() at the end of a request to help with testing!
};


//if req.method === get
  //if path !== background.jpg
    // we know its a request for an image
    // Check
    //writeHead 404

/*
If (modules.exports.backgroundImageFile !== background.jpg) {
  // we know the background is requested because our default path has changed
  // Then we check our file system to see if the image exists
  // using current path that changed
}
*/

// 'http://127.0.0.1:3000/background.jpg'

// 'http://127.0.0.1:3000/water-lg.jpg'
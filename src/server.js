const http = require('http');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    //Split URL on ? to check for params
  const requests = request.url.split('?');
  const URL = requests[0];
    //List of all params
  const reqParams = {};

  // Get params
  if (requests.length > 1) {
      //Split on &
    const params = requests[1].split('&');

    for (let i = 0; i < params.length; ++i) {
      const paramSplit = params[i].split('=');
      if (paramSplit.length === 2) {
        const param = paramSplit[0];
        const otherParam = paramSplit[1];
        reqParams[param] = otherParam;
      }
    }
  }

//Determine what is being requested
  switch (URL) {
    case '/':
      responseHandler.getIndex(request, response);
      break;
    case '/style.css':
      responseHandler.getCSS(request, response);
      break;
    case '/addUser':
      responseHandler.addUser(request, response);
      break;
    case '/getUsers':
      responseHandler.getUsers(request, response);
      break;
    // Panic if something goes wrong
    default:
      responseHandler.getMissing(request, response);
      break;
  }
}


http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
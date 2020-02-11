const http = require('http');
const url = require('url'); // pull in the url module
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.getBadRequest,
    '/unauthorized': responseHandler.getUnauthorized,
    '/forbidden': responseHandler.getForbidden,
    '/internal': responseHandler.getInternalError,
    '/notImplemented': responseHandler.getNotImplemented,
    '/notFound': responseHandler.getNotFound,
    index: responseHandler.getIndex
};

const onRequest = (request, response) => {
  // parse the url using the url module
  // This will let us grab any section of the URL by name
  const parsedUrl = url.parse(request.url);

  // grab the 'accept' headers (comma delimited) and split them into an array
  const acceptedTypes = request.headers.accept.split(',');

  // check if the path name (the /name part of the url) matches
  // any in our url object. If so call that function. If not, default to index.
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
  } else {
    // otherwise send them to the index (normally this would be the 404 page)
    urlStruct.index(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

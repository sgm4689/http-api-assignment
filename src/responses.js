const fs = require('fs'); // pull in the file system module

const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// function to send response
const respond = (request, response, content, type, status, header, acceptedTypes) => {

if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    if (header.id);
        responseXML += ` <id>${header.id}</id>`;
    responseXML += ` <message>${header.message}</message>`;
    responseXML += ` </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml');
  }
    
 const stringMessage = JSON.stringify(header);

    
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// function to handle the index page
const getIndex = (request, response, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
    const header = {
        message: 'This is a successful response',
    }
    respond(request, response, stringMessage, 'application/json', 200, header, acceptedTypes)
 
};

const getBadRequest = (request, response, acceptedTypes) => {
  const header = {
    id: 'badRequest',
      message: 'missing valid query parameter set to true'
  };
  respond(request, response, stringMessage, 'application/json', 200, header, acceptedTypes)
};

const getUnauthorized = (request, response, acceptedTypes) => {
  const header = {
    id: "unauthorized",
    message: 'Missing loggedIn query parameter set to yes',
  };
  respond(request, response, stringMessage, 'application/json', 200, header, acceptedTypes)
};

const getForbidden = (request, response, acceptedTypes) => {
  const header = {
    id: "forbidden",
    message: 'You do not have access to this content',
  };
  respond(request, response, stringMessage, 'application/json', 200, header, acceptedTypes)
};

const getInternalError = (request, response, acceptedTypes) => {
  const header = {
      id: "internalError",
    message: 'Internal Server Error.  Something went wrong',
  };
  respond(request, response, stringMessage, 'application/json', 200, header, acceptedTypes)
};

const getNotImplemented = (request, response, acceptedTypes) => {
  const header = {
      id: "notImplemented",
    message: 'A get request for this page has not been implemented yet.  Check again later for updated content',
  };
  respond(request, response, stringMessage, 'application/json', 200, header, acceptedTypes)
};

const getMissing = (request, response, acceptedTypes) => {
  const header = {
      id: "notFound",
    message: 'The page you are looking for was not found',
  };
  respond(request, response, stringMessage, 'application/json', 200, header, acceptedTypes)
};

module.exports.getSuccess = getSuccess;
module.exports.getBadRequest = getBadRequest;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternalError = getInternalError;
module.exports.getNotImplemented = getNotImplemented;
module.exports.getMissing = getMissing;

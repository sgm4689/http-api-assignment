const fs = require('fs'); // pull in the file system module

//Loads CSS and homepage
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const users = {};

//sends info to homepage
const respondJSON = (request, response, status, content, object) => {
     const stringMessage = JSON.stringify(object);//Convert JSON to string for transmission
   if (request.method !=="HEAD" && content && object){//Checks to make sure data's supposed to be sent
       response.writeHead(status, { 'Content-Type': content});
       response.write(stringMessage);
   }else{
       response.writeHead(status);
   }
    response.end();
};

//Gets the homepage
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};


//Gets the CSS
const getCSS = (request, response, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getUsers = (request, response) => {
    respondJSON(request, response, 200, 'application/json', users)
   
}
const addUser = (request, response) =>{
      const body = [];

  //If There's an error, move on
  request.on('error', () => {
    response.statusCode = 400;
    response.end();
  });

  // Get Data
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const person = JSON.parse(Buffer.concat(body).toString());

    //the person is missing a parameter.  Throw an error
    if (!person.name || !person.age) {
      respondJSON(request, response, 400, 'application/json', {
        message: 'Name and age are both required.',
        id: 'missingParams',
      });
    }
    else if (users[person.name]) {//If person exists
      respondJSON(request, response, 204, null, null);
    } else {
      users[person.name] = { name: person.name, age: person.age };
      respondJSON(request, response, 201, 'application/json', {
        message: 'Created Successfully',
      });
    }
  });
}

const getMissing = (request, response, acceptedTypes) => {
  const header = {
      id: "notFound",
    message: 'The page you are looking for was not found',
  };
  respondJSON(request, response, 404, 'application/json', header);
};

module.exports = {
  addUser,
  getUsers,
  getMissing,
  getIndex,
  getCSS
};

// const { verify, secureHeapUsed } = require("crypto");
// const { ESLint } = require("eslint");
const express = require("express");//express: This is the Express library, which helps you create web servers and handle HTTP requests
const jwt = require('jsonwebtoken');//This library helps create and verify JWTs, which are used for securely transmitting information between parties.
const app = express();//app: This is your Express application. It lets you define routes, middleware, and other settings.
//app.get("/"): This defines a route for the root URL ("/"). When someone visits this URL, the function provided will be executed
//(req, resp): These are the request and response objects. req contains information about the incoming request, and resp is used to send a response back to the client
//resp.json(...): This sends a JSON response back to the client with the message "a sample api".
const secretekey = "secretekey";

app.get("/", (_req, resp) => {
    resp.json({
        message: "a sample api"
    });
});

//login api
//This line sets up a route for handling POST requests to the /login endpoint. When someone sends a POST request to /login, the function inside will be executed.
//This creates a 'user' object with some predefined information (id, username, email). In a real application, this information would typically come from a database or user input.

app.post("/login", (_req, resp) => {
    const user = {
        id: 12,
        username: "ayesha",
        email: "azizayesha961@gmail.com"
    };

    //sign will be function
    //callback function
    //This line sends a JSON response back to the client containing the token. The client can then use this token for authentication in subsequent requests.

    jwt.sign({ user }, secretekey, { expiresIn: '300s' }, (_error, token) => {
        resp.json({
            token
        });
    });
});

//jwt.sign(...) is a function that creates a JSON Web Token (JWT).
// The first argument { user } is the payload, which includes the user information to be encoded into the token.
// secretkey is a string used to sign the token. This should be kept secret and secure.
// { expiresIn: '300s' } specifies that the token will expire in 300 seconds (5 minutes).
// The last argument is a callback function that gets called once the token is created.

////acess for profile then it will first
//token ko verify karna ka lia fuction bana para ga
//This line defines a POST route for /profile.
//The verifytoken function is a middleware that runs before the final route handler.
//If verifytoken calls next(), the final route handler will execute.


// Profile API
app.post('/profile', verifytoken, (req, resp) => {
    jwt.verify(req.token, secretekey, (err, authData) => {
        if (!err) {
            console.error("Token verification failed:", err);
            resp.sendStatus(403); // Forbidden if the verification is failed
        } else {
            resp.json({
                id:12,
                name:'ayesha',
                email:'azizayesha961@gmail.com',
                authData//callback function
            });
        }
    });
});
// Middleware to verify token

//This defines a function called verifytoken that takes three arguments:
//req: The request object that contains information about the HTTP request (e.g., headers, body).
//resp: The response object that will be used to send a response back to the client.
//next: A function that, when called, passes control to the next middleware function in the stack.
function verifytoken(req, resp, next) {
    const bearerHeader = req.headers['authorization'];//The authorization header in the HTTP request is extracted and stored in the bearerHeader variable. This header usually contains the token needed for authentication./
//This checks if the authorization header is defined. If it exists, the code proceeds to extract the token. If it doesn't, the code skips to the else block, which handles the case where the header is missing.
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");//The authorization header typically follows the format "Bearer <token>". The code splits the bearerHeader string by spaces into an array called bearer.
        const token = bearer[1];//The token is the second part of the array (bearer[1]), so it is extracted and stored in the token variable.
        req.token = token;//The token is then attached to the req object as req.token, so it can be used later in the request lifecycle
        // console.log("Token extracted:", token); // Log the token for debugging
        next();//If the token was successfully extracted, the next() function is called, allowing the request to move on to the next middleware or route handler in the stack.

    } else {
        // console.error("Authorization header is missing or malformed");
        resp.send({
            result: 'Token is not valid'
        });
    }
}//If the authorization header is missing or not properly formatted, the else block is executed.
//The server sends a response back to the client with the message 'Token is not valid', indicating that the token could not be verified.

//This function verifies the presence of a token in the authorization header of an incoming HTTP request.
//If the token is found, it is extracted and attached to the req object, and the request continues to the next step.
//If the token is missing or the header is incorrectly formatted, a response is sent back with an error message, stopping further processing of the request.







//This function checks if the incoming request has an Authorization header.
// const bearerHeader = req.Header['Authorization']; tries to get the Authorization header from the request.
// if (typeof bearerHeader !== "undefined") checks if the header is defined (i.e., if the token is present).
// If the token is present, you would add the logic to verify it in this block (which is currently empty).
// If the token is not present, it responds with a message saying the token is not valid and doesn't call next(), so the final route handler doesn't run.
app.listen(3000, () => {
    console.log('App is running on port 3000');
});
 //app.listen(3000, ...): This starts the Express server and tells it to listen for incoming requests on port 3000.
//The callback function inside listen will run when the server starts, and it logs the message "app is running on 3000 app" to the console.

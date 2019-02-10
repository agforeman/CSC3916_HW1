// This line imports http and gets a server object from it
var server = require("http").createServer();

// On the server object we are creating a listener for the
// request event
server.on("request", (request, response) => {
    var body = [];
    // On the request object we are listening to the data
    // event
    request.on("data", chunk => {
        // When data is available push it onto the array
        body.push(chunk);
    });
    request
        .on("end", () => {
            // On the request object we are listening to
            // the end event. once all data is retrieved
            // we rebuild it into the original data
            let bodyString = body.concat().toString();
            // Log the data recieved to the console
            console.log(bodyString);
            // Set the staus code and response value
            response.statusCode = 200;
            response.end(bodyString);
        })
        .on("error", () => {
            // On the request object we are listening to
            // the error event. If emitted set status to
            // 400 and end.
            response.statusCode = 400;
            response.end();
        });
    response.on("error", err => {
        // On the response object we are listening to
        // the error event. If emitted we log the error
        console.error(err);
    });
});

// This tells the server to which port it should be attached.
server.listen(process.env.PORT || 8008, () => {
    console.log("Server listening at 8008");
});

module.exports = server; // for testing

//curl -d "echo" -H "Content-Type: text" -X POST http://localhost:8008

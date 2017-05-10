// Dependencies
// =============================================================
var db = require("../models");

module.exports = function(ioProm) {

    // Create an initial session object that will populate as users join sessions
    var sesObj = {};

    // Our IO Promise, all socket functions will happen inside here
    ioProm.then(function(io) {
        io.on('connection', function(socket) {

            // A connection was made and an initialconnect message should be incoming from the client
            console.log("Socket connection - incoming initialConnect message");

            // This handles initial connect messages
            socket.on("initialConnect", function(data){

                // Log that we recieved an initial connect message
                console.log("initialConnect message recieved");

                // assign attributes to this particular socket for use later
                socket.userId = data.userId;
                socket.classId = data.classId;

                //  here we find or create the user/class on the session table (permanently add to the session)
                db.Session.findOrCreate({
                    where: {
                        UserId: data.userId,
                        ClassId: data.classId
                    },
                    defaults: {
                        points: 0
                    }
                }).spread(function(sesData, created){

                    // query the database to find more information abuot the connected user
                    db.User.findAll({
                        where: {
                            id: socket.userId
                        }
                    }).then(function(userData){

                    // Add the user to the socket room (class) for emitting messages to specific classes
                    socket.join(socket.classId);

                    // if the class is not already an object in our session object
                    if (typeof sesObj[socket.classId] === "undefined"){

                        // then create it
                        sesObj[socket.classId] = [];

                        // or else
                    } else {

                        // emit all user to only the sender (for them to buil all cards for everyone currently in their joined class)
                        socket.emit("allUsers", sesObj[socket.classId]);
                    };

                    // Create a new user object with userData from the query (to be used for building cards on the client)
                    var newUser = {
                        userId: socket.userId,
                        classId: socket.classId,
                        fName: userData[0].fName,
                        lName: userData[0].lName,
                        email: userData[0].email,
                        picture: userData[0].picture,
                        gitLink: userData[0].gitLink
                    };

                    // if the session was added during the findorcreate
                    if (created){

                        // set the points to 0
                        newUser.points = 0;

                    // if the session was already existing
                    } else {
                    
                        // set the points from the database
                        newUser.points = sesData.points;
                    };

                    // add our user to their class in our session object
                    sesObj[socket.classId].push(newUser);

                    // emit to everyone in the class that a new user has joined (along with their data to build the card)
                    io.to(socket.classId).emit("userAdd", newUser);
                    });
                });
            });

            // this handles disconnect messages
            socket.on('disconnect', function() {

                // Log to the console which user has disconnected
                console.log("User " + socket.userId + " disconnected");

                // Loop through the class object of the user that disconnected
                for (i=0; i<sesObj[socket.classId].length; i++){

                    // if we find them
                    if (sesObj[socket.classId][i].userId === socket.userId){

                        // update the session table with their current amount of points
                        db.Session.update({
                            points: sesObj[socket.classId][i].points
                        }, {
                            where: {
                                UserId: socket.userId,
                                ClassId: socket.classId
                            }
                        });

                        // delete them from our class object (this keeps our class object clean with only connected users)
                        sesObj[socket.classId].splice(i, 1);
                        break;
                    };
                };

                // if there are no longer any users in our class object
                if (!sesObj[socket.classId].length){

                    // delete the class from our session object
                    delete sesObj[socket.classId];

                // or else
                } else {

                    // emit to everyone in the class the user id that has left (to be handled on the client side)
                    io.to(socket.classId).emit("userRemove", socket.userId);
                };
            });

            // handles adding a point to a user
            socket.on('addPoint', function(userId) {

                // Loop through the class object to find the user that needs a point added
                for (i=0; i<sesObj[socket.classId].length; i++){

                    // if we find them
                    if (sesObj[socket.classId][i].userId === userId){

                        // add a point!
                        sesObj[socket.classId][i].points++;

                        // emit to everyone that a point needs to be added!
                        io.to(socket.classId).emit("addPoint", userId);
                        break;
                    };
                };
            });

            // more event handlers can go here if necessary

        });
    });
    // http://docs.sequelizejs.com/en/latest/docs/models-usage/
    // http://stackoverflow.com/questions/24100218/socket-io-send-packet-to-sender-only
    // https://github.com/socketio/socket.io/blob/318d62/examples/chat/index.js#L36
    // http://stackoverflow.com/questions/19150220/creating-rooms-in-socket-io
};
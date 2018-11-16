var jwt = require('jsonwebtoken');

const server_secret_key = "cpme273secretkeysinha";

function checkLoggedInUser(req,res,next) {
  alert("user is authenticated: ",req.body.servertoken );
    const tokenheader = req.body.servertoken || req.headers['servertoken'];

    if (tokenheader) {
      alert("user is authenticated: ",req.body.servertoken );
        jwt.verify(tokenheader, server_secret_key, function(err, decoded){
            if (!err) {
                //req.body.uidfromtoken = decoded.uid;
            }
            next();
        });
    }else {
        next();
    }

}
exports.checkLoggedInUser = checkLoggedInUser;
exports.server_secret_key = server_secret_key;

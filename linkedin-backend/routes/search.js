// var express = require("express");
// var router = express.Router();
// var { mongoose } = require("./../db/mongoose");
// var { User } = require("./../models/user");

// router.post("/users", function(req, res, next) {
//   console.log("Inside Search Post Request", req);
//   User.find()
//     .then(response => {
//       console.log("Response from find users", response);
//       res.send(response);
//     })
//     .catch(err => {
//       console.log("Error : ", err.response);
//       res.status(500).json({
//         message: "internal server error"
//       });
//     });
// });

// module.exports = router;

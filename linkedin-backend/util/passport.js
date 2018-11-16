const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const keys= require('./utils');
const opt={};
opt.jwtFromRequest= ExtractJWT.fromHeader();
opt.server_secret_key = keys.server_secret_key;

const passport=()=>{
  passport.use(new JwtStrategy(opt, (jwt_payload,done)=>{
    console.log(jwt_payload);
  }))
}

exports.passport=passport;

var mongodb_connection = null;
var mongo = require('./mongodbconnection.js').connectMongo();
var collectionJobPostings = require('./../constants/constants.js').MONGO_COLLECTION_JOB_POSTINGS;
var MONGO_DB_NAME = require('./../constants/constants.js').MONGO_DB_NAME;

mongo.then((db)=>{
    mongodb_connection = db;
}).catch((error)=>{
    console.log(error);
});


var searchJobs = async function(params) {
    try{
        let docs=[];
        const linkedInDB = mongodb_connection.db(MONGO_DB_NAME);
        if(params == null) {
          docs = await linkedInDB.collection(collectionJobPostings).find({});
        }
        else {
          docs = await linkedInDB.collection(collectionJobPostings).find({"CompanyName":params});
        }

        if(docs == null){
            return Promise.reject("No Jobs found");
        }else{
            const joblistings = await docs.toArray();
            return Promise.resolve(joblistings);
        }
    }catch(error){
        console.log(error);
        return Promise.reject("Could not make a mongodb connection")
    }
}

module.exports = {searchJobs};

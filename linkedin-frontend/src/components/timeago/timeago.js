//current date in string
var timeago = async function(postedDate) {
    var timeStampDiffInSeconds = null;
    
    try{
        const currentTimeStampInSeconds = parseInt(new Date().getTime()/1000);
        const postedDateTimeStampInSeconds = parseInt(new Date(postedDate).getTime()/1000);
        timeStampDiffInSeconds = currentTimeStampInSeconds-postedDateTimeStampInSeconds;
        console.log(timeStampDiffInSeconds);
    }catch(error){
        console.log("Inside timeago.js");
        console.log(error);
        return Promise.reject(error);
    }

    switch(timeStampDiffInSeconds){
        case timeStampDiffInSeconds>=0 && timeStampDiffInSeconds<60*3:
             // between 0 to 180 seconds
             return Promise.resolve("A few seconds ago");
             break;
        case timeStampDiffInSeconds>=60*3 && timeStampDiffInSeconds<60*60:
             //between 180 seconds to 60 minutes
             return Promise.resolve("A few minutes ago");
             break;
        case timeStampDiffInSeconds>=60*60 && timeStampDiffInSeconds<60*60*24:
             //between 60 minutes to 24 hours
             return Promise.resolve("A few hours ago");
             break;
        case timeStampDiffInSeconds>=60*60*24 && timeStampDiffInSeconds<60*60*24*30:
             // between 24 hours to 30 days
             return Promise.resolve("A few days ago");
             break;
        case timeStampDiffInSeconds>=60*60*24*30 && timeStampDiffInSeconds<60*60*24*30*365:
             // between 30 days to 365 days
             return Promise.resolve("A few months ago");
             break;
        default : return Promise.resolve("A few years ago");
                  break;
    }
}

export {timeago};
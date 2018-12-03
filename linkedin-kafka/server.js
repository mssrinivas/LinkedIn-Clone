var connection =  new require('./kafka/Connection');
// var appliedjob = require('./services/appliedjob.js');
// var savedjob = require('./services/savedjob.js');
//var  jobsave = require('./services/jobsave.js');
//var customapply = require('./services/customapply.js');
//var joblisting = require('./services/joblisting.js');

// var search = require('./services/search.js');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('kafka server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('\n--topic filename handle_request--'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

// handleTopicRequest("applied_jobs",appliedjob)
// handleTopicRequest("saved_jobs",savedjob)
//handleTopicRequest("job_save",jobsave)
//handleTopicRequest("custom_apply",customapply)
//handleTopicRequest("job_listing",joblisting)

// handleTopicRequest("search",search)









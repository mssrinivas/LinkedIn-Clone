var mongoose =require('mongoose');

var userschema = mongoose.Schema({
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    password :{
        type : String
    },
    email : {
        type : String
    },
    recruiter_flag : {
        type : Number
    },
    address : {
        type : String
    },
    state : {
        type : String
    },
    city : {
        type : String
    },
    zip_code : {
        type : Number
    },
    experience : {
        type : String
    },
    education : {
        type : String
    },
    skills : {
        type : String
    },
    profile_summary : {
        type : String
    },
    profile_img : {
        type : String
    },
    // connections:[
    //     {
    //         connection_name: String,
    //         connection_email: String,
    //         experience: String,
    //         connected: Boolean,
    //         mutual_connections:[{
    //             mutual_connection_name: String,
    //             mutual_connection_email: String,
    //             mutual_connection_experience: String
    //         }]
    //     }
    // ],
    
    connections:[
       { 
        email : String,
        first_name:String,
        last_name:String,
        experience:String
       }
    ],

    pending:[
    ],
    waiting:[
    ]

});

const User = mongoose.model('User',userschema);

module.exports.User = User;

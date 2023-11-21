const mongoose = require('mongoose');

const doctorbookedSchema = mongoose.Schema({
    demail : {type : String},
    pemail : {type : String},
    bookedtime : {type:String},
    bookeddate: {type : String},
    diease : {type : String},
    dname : {type:String},
    pname : {type:String},
    specality : {type:String},
    status : {type:String},
    doctorapproved : {type:Boolean},
    napprovedreason : {type : String},
    iscancel :{type:Boolean},
    doctorFees:{type:String},
    Paymet :{type : String}
},
{
    collection: "Doctorbook",
}
)

module.exports = mongoose.model("Doctorbook",doctorbookedSchema);
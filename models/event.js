const mongoose=require('mongoose')
const coverImageBasePath='uploads/eventCover'
const path=require('path')
const eventSchema=new mongoose.Schema({
    eventName:{
        type: String,
        required:true
    },
    eventDate:{
        type:Date,
        required:true
    },
    description:{
        type:String
    },
    entryFee:{
        type: Number,
        required: true
    },
    createdAt:{
        type:Date,
        required: true,
        default:Date.now
    },
    coverImage:{
        type:String,
        required:true,
     },
     organiser:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Organiser'
     }


})
eventSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage!= null){
       return path.join('/',coverImageBasePath,       this.coverImage)
    }
})
module.exports=mongoose.model('Event',eventSchema)
module.exports.coverImageBasePath=coverImageBasePath
const mongoose=require('mongoose')
const Event=require('./event')
const organiserSchema=new mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    city:{
        type:'String',
        required:true
    }
})
organiserSchema.pre('deleteOne',function(next) {
    Event.find({organiser : this.id},(err,events)=>{
        if(err){
            next(err)
        }else if(events.length > 0){
            next(new Error('This organiser has events'))
        }else {
            next()  
        }})
    })
module.exports=mongoose.model('Organiser',organiserSchema)
const express=require('express')
const router=express.Router()
const Organiser=require('../models/organiser')
const Event=require('../models/event')
// all organisers
router.get('/', async (req,res)=>{
    let searchOptions={}
    if(req.query.name!=null && req.query.name!==''){
searchOptions.name=new RegExp(req.query.name,'i')
    }
    try{

const organisers=await Organiser.find(searchOptions)
res.render('organisers/index',{organisers:organisers, searchOptions:req.query})
}catch{
    res.redirect('/');
}
    
})
// new organiser
router.get('/new',(req,res)=>{
    res.render('organisers/new',{organiser: new Organiser()})
})
//create new organiser
router.post('/',async (req,res)=>{
    const organiser=new Organiser({
        name: req.body.name,
        city: req.body.city
    })
   try{
    const newOrganiser=await organiser.save();
    res.redirect('organisers')
   }
   catch{
    res.render('organisers/new',{
        organiser:organiser,
        errorMessage: 'Error creating organiser'
    })

   }
   }) 
router.get('/:id',async(req,res)=>{
try{
const organiser=await Organiser.findById(req.params.id)
const events=await Event.find({organiser: organiser.id}).limit(3).exec()
res.render('organisers/show',{
        organiser:organiser,
        eventsByOrganiser:events
    })
    }
    catch(err){
       // console.log(err)
        res.redirect('/')
    }
})
router.get('/:id/edit',async (req,res)=>{
    const organiser= await Organiser.findById(req.params.id)
    try{
        res.render('organisers/edit',{organiser: organiser})
    }
    catch{
        res.redirect('/organisers')
    }
})
router.put('/:id',async (req,res)=>{
   let organiser
   try{
    organiser=await Organiser.findById(req.params.id);
    organiser.name=req.body.name;
    organiser.city=req.body.city;
    await organiser.save()
    res.redirect(`/organisers/${organiser.id}`)
   }
   catch{
    if(organiser==null){
        res.redirect('/')
    }
    else{
    res.render('organisers/edit',{
        organiser:organiser,
        errorMessage: 'Error updating organiser'
    })
}

   }
   
})
router.delete('/:id',async (req,res)=>{
let organiser
   try{
    organiser=await Organiser.findById(req.params.id)
    await organiser.remove()
    res.redirect('/organisers')
   }
   catch(err){
    if(err)
    console.error(err)
    if(organiser==null){
        res.redirect('/')
    }
    else{
    res.redirect(`/organisers/${organiser.id}`)
}

   }
})

module.exports=router;








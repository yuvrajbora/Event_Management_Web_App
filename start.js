const express=require('express')
const app=express();
const expressLayouts=require('express-ejs-layouts');
const bodyParser=require('body-parser');
const methodOverride=require('method-override')

const indexRouter=require('./routes/index');
const organiserRouter=require('./routes/organisers');
const eventRouter=require('./routes/events');


app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb',extended: false}));

const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/myapp',{
    useNewUrlParser:true})
const db=mongoose.connection;
db.on('error',error=>console.error('error'));
db.once('open',()=>console.log('Connected to Mongoose'));
app.use('/',indexRouter);
app.use('/organisers',organiserRouter);
app.use('/events',eventRouter);
app.listen(process.env.PORT || 3000);
 
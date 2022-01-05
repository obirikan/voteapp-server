const mongoose=require('mongoose');

mongoose.set('debug',true);
mongoose.Promise=global.Promise

mongoose.connect('mongodb+srv://kelvin:salvation22@cluster0.iaa1e.mongodb.net/vote',{
    useNewUrlParser:true
})
module.exports.user=require('./user')
module.exports.polls=require('./polls')

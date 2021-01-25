const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todosDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});
const db = mongoose.connection;
db.on('open', () => {
    console.log('Connection Esaplish..');
})
db.on('error', (er) => {
    console.log(er);
})

module.exports = mongoose;
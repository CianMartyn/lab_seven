const express = require('express')
const app = express()
const port = 4000;

// npm run build
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// CORS
// const cors = require('cors');

// app.use(cors());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// npm i body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.lf4uq0d.mongodb.net/MYDB?retryWrites=true&w=majority');

 // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// new book schema 

const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String,
})

const bookModel = mongoose.model('ciansbooks', bookSchema);

//app.delete
app.delete('/api/book/:id',async (req, res)=>{
    console.log("Delete: "+req.params.id);

let book = await bookModel.findByIdAndDelete(req.params.id)
res.send(book);
})

// put method for book/id
app.put('/api/book/:id', async (req, res)=>{
    console.log("Update: "+req.params.id);

    let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.send(book);
})

// Post method to /api/books
app.post('/api/book', (req, res) => {
    console.log(req.body);
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })
        .then(() => { res.send("Book Created!") })
        .catch(() => { res.send("Book NOT Created!") })
})

// Hello world on opening page
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// Book data
app.get('/api/books', async(req, res) => {

    let books = await bookModel.find({})
    res.json(books)
})

// Read book id
app.get('/api/book/:id', async(req, res)=>{
    console.log(req.params.id);

    let book = await bookModel.findById(req.params.id);
    res.send(book)

})

//Handles any requests that don't match the ones above
app.get('*', (req,res) => {
    res.sendFile(path.join(_dirname+'/../build/index.html'));
});

// Consolelog
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


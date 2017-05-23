var express = require('express')
var bodyParser = require('body-parser')
var Post = require('./models/post')

var app = express()
app.use(bodyParser.json())


app.get('/', function(req, res){
    res.sendfile('layouts/posts.html')
    
})

app.get('/api/posts', function(req, res){
    res.json([
        {
            username: 'imran',
            body: 'Its running!'
        }
    ])
})


/*
app.post('/api/posts', function(req, res){
    console.log('post received!')
    console.log('req.body.username')
    console.log('req.body.body')
    res.send(201)
})
*/

app.post('/api/posts', function (req, res, next) {
  var post = new Post({
    username: req.body.username,
    body:     req.body.body,
  })
  post.save(function (err, post) {
    if (err) { return next(err) }
    res.status(201).json(post)
  })
})

app.listen(3000, function(){
    console.log('Server listening on', 3000)
})
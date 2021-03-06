const express = require('express')
var mongojs = require('mongojs')
var bodyParser = require('body-parser')

var app = express();
var db = mongojs('contactlist', ['contactlist'])
app.use(express.json())

// app.use(bodyParser.json());


// app.get('/', function(req, res){
//     res.send("Hello World from server.js")y

// });

app.use(express.static(__dirname+"/public"))

app.get('/contactlist', function(req, res){
    console.log("Req reached the express server")

    db.contactlist.find(function(err, docs){
        if(err == null)
            res.json(docs)
        else{
            console.log("Error in retrieving the data")
        }
    })
    
})
app.post('/contactlist', function(req, res){
    console.log(req.body)
    db.contactlist.insert(req.body, function(err, doc){
        if(err!=null){
            console.log(err.message)
        }
        else{
            res.json(doc)
        }
    })
})

app.delete('/contactlist/:id', function(req, res){
    var id = req.params.id;
    db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
        if(err!=null){
            console.log(err.message)
        }
        else{
            res.json(doc)
        }
    })
})

app.get('/contactlist/:id', function(req, res){
    var id = req.params.id;
    db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
        if(err!=null){
            console.log(err.message)
        }
        else{
            res.json(doc)
        }
    })
})
app.put('/contactlist/:id', function(req, res){
    var id = req.params.id;
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
        update : {$set:{name: req.body.name, email:req.body.email, number:req.body.number}},
        new:true}, function(err, doc){
            if(err!=null){
                console.log(err.message)
            }
            else{
                res.json(doc)
            }
    })
})


app.listen(3000, (err)=>{
    if(err==null)
    {
        console.log("Server listening @3000")
    }
    else{
        console.log("Opps!!")
    }
});
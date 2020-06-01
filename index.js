const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


app.use(cors())
app.use(bodyParser.json())

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });



app.get('/classes',  (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
      const product = req.body;
      client.connect(err => {
      const collection = client.db("powerGym").collection("Classes");
      collection.find().toArray ((err, documents)=>{
        if (err) {
          console.log(err); 
          res.status(500).send({massage:err});
        }else{
          res.send(documents);
        }
        
      }); 
      client.close();
    });
  })

 
  app.get('/pricing',  (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
        const product = req.body;
        client.connect(err => {
        const collection = client.db("powerGym").collection("pricing");
        collection.find().toArray ((err, documents)=>{
          if (err) {
            console.log(err); 
            res.status(500).send({massage:err});
          }else{
            res.send(documents);
          }
          
        }); 
        client.close();
      });
    })
  

    app.get('/member',  (req, res) => {
      client = new MongoClient(uri, { useNewUrlParser: true });
          const product = req.body;
          client.connect(err => {
          const collection = client.db("powerGym").collection("member");
          collection.find().toArray ((err, documents)=>{
            if (err) {
              console.log(err); 
              res.status(500).send({massage:err});
            }else{
              res.send(documents);
            }
            
          }); 
          client.close();
        });
      })


app.post('/addMember', (req , res) =>{
  const orderDetails = req.body;
  orderDetails.orderTime = new Date();
  console.log(orderDetails);
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("powerGym").collection("member");
    collection.insertOne(orderDetails,(err, result)=>{
      if (err) {
        //console.log(err); 
        res.status(500).send({massage:err});
      }else{
        res.send(result.ops[0]);
      }
       
    }); 
    client.close();
  });
 
})



const port = process.env.PORT || 3000;
  app.listen(port , ()=>console.log("listening  to port 3000"));
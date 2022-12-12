const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;


// middle wears
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("backend is working");
});





// mongo db connection
const uri = `mongodb+srv://assignment-11:vVhcF0lsJGBxDcDa@cluster0.rdtrwss.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
 const ProfileCollection = client.db("Profile").collection("projects");
    app.get('/projects',async(req,res)=>{
        const result = await ProfileCollection.find({}).toArray()
        res.send(result)
    })
    app.get('/project/:id',async(req,res)=>{
        const id = req.params.id
        const result = await ProfileCollection.findOne({_id:ObjectId(id)})
        res.send(result)
    })
  } finally {
  }
};
run().catch(console.dir);

app.listen(port, () => {
  console.log("server is running on port : ", port);
});

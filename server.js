var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api",(req,res) =>{
  var now = new Date();
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  })
})

app.get("/api/:date_string",(req,res) =>{
  //{"unix":<date.getTime()>,"utc":<date.toUTCString()> }
  let dateString = req.params.date_string;
  let passedInValue = new Date(dateString);
  if(passedInValue == "Invalid Date"){
    res.json({"error":"Invalid date"});
  }else{
    res.json(
      {
        "unix" : passedInValue.getTime(),
        "utc" : passedInValue.toUTCString()
      }
    )
  }

})
  


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

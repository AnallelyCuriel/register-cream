const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || "8000";
var bodyParser = require('body-parser');

const axios = require("axios");
const redis = require("redis");

const redisPort = 6379
const client = redis.createClient(redisPort);
var dataFormio = [];

app.engine('html', require('ejs').renderFile);

app.get('/', async (peticion, respuesta) => {

  dataFormioExample = {
    components: [
      {
        type: 'textfield',
        key: 'firstName',
        label: 'First Name'
      },
      {
        type: 'textfield',
        key: 'lastName',
        label: 'Last Name'
      }
    ]
  };

  const register =await axios.post(`https://platon.cf-it.at/affiliate/getRegistrationFields?login=testaffiliateexternal&pass=testaffiliateexternal`);
     MyClass(register.data)
    
    dataFormioExample.components=dataFormio;
    var resp=JSON.stringify(dataFormioExample);

  var resp1=resp.replace(/"/g, '\\"');
    
respuesta.send(`     
  <html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css">
    <script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
    <script type="text/javascript">
      window.onload = function() {
        var data = JSON.parse("`+resp1+`");
        Formio.icons = 'fontawesome';
        Formio.builder(document.getElementById('dataFormio'),data).then((form) => {
          form.submission = {
          };
        });
     } 
    </script>
  </head>
  <body>
    <div id="dataFormio"></div>
  </body>
</html>
    `);
});
function MyClass(json){


for(var component in json.data) {
  dataFormio.push(makeDTO(component,
                          json.data[component].type,
                          json.data[component].values,
                          json.data[component].req,
                          json.data[component].regex,
                          json.data[component].maxlength));
}

function makeDTO(label,tipo,values,req,regex,maxlength) {
  /*console.log("label",label);
  console.log("tipo",tipo);
  console.log("values",values);
  console.log("req",req);
  console.log("maxlength",maxlength);
  console.log("regex",regex);*/
	if(tipo=='text'){
	tipo =  'textfield'; 
	}
  if (typeof values !== 'undefined'){
    var valuesSelect=[]; 
  for (var value in values){
    valuesSelect.push( {value: values [value], label: values [value]})
  }
   var valuesAdapter = {values:  valuesSelect};
  }
  
    elementFormio ={ type: tipo,  key: label ,  label: label ,maxlength:maxlength, 
      validate: {required: false,minLength: "",maxLength: maxlength, pattern:"",
      custom: "",customPrivate: false },
      data: typeof values !== 'undefined'? valuesAdapter: null };
    return elementFormio;
   }
}

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.listen(port, () => {
console.log(`Listening to requests on http://localhost:${port}`);
});

 
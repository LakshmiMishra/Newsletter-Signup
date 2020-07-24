const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const Mailchimp = require('mailchimp-api-v3');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})
// app.post("/", function(req, res) {
//

//   const url = "https://us17.api.mailchimp.com/3.0/lists/c910f86691";

//   const jsonData = JSON.stringify(data);
//   const options = {
//     method: "POST",
//     auth: "LakshmiMishra1:c40d27fd159a682d6d7e6589b759ee20-us17"
//
//   }
// console.log(jsonData)
//   const requ = https.request(url, options, function(response) {
//     response.on("data", function(data) {
//       console.log(JSON.parse(data))
//     })
//     console.log("after")
//     requ.write(jsonData);
//     requ.end();
//   })
// })

// var mailchimpInstance   = 'us17',
//     listUniqueId        = 'c910f86691',
//     mailchimpApiKey     = 'c40d27fd159a682d6d7e6589b759ee20-us17';
//
// app.post('/', function (req, res) {
//     https
//         .request('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
//         .set('Content-Type', 'application/json;charset=utf-8')
//         .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
//         .send({
//           'email_address': req.body.email,
//           'status': 'subscribed',
//           'merge_fields': {
//             'FNAME': req.body.fName,
//             'LNAME': req.body.lName
//           }
//         })
//             .end(function(err, response) {
//               if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
//                 res.send('Signed Up!');
//               } else {
//                 res.send('Sign Up Failed :(');
//               }
//           });
// });

// handle subscribe form submit eve
app.post('/', (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  const api_key = 'c40d27fd159a682d6d7e6589b759ee2-us17'; // api key -
  const list_id = 'c910f86691'; // list id
  const mailchimp = new Mailchimp(api_key); // create MailChimp instance
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName
      }
    }]
  }
  mailchimp.post(`lists/${list_id}`, data).then((result) => {
if(result.statusCode===200)
{
  return  res.sendFile(__dirname + "/success.html")
}
    //return res.send(reslut);
  }).catch((error) => {
    //return res.send(error);
      return res.sendFile(__dirname + "/failure.html")
  });
});
app.post('/failure',function(req,res){
  res.redirect('/');
})
app.listen(process.env.PORT||3000, function() {
  console.log("server is started");
})
//cc40d27fd159a682d6d7e6589b759ee20-us17

//c910f86691

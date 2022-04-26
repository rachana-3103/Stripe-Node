const app = require("express")();
const stripe = require("stripe")(process.env.PUBLISHABLE_KEY);
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
// to serve files of views directory
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug') // setting pug as view engine
 
// to open the payment page on base url
app.get("/", ((req, res) => {
res.render("index",{keyPublishable: process.env.PUBLISHABLE_KEY});
}));
 
app.post("/pay", function(req, res) {
 
let amount = 10*100;
 
// create a customer
stripe.customers.create({
email: req.body.email, // customer email
source: req.body.stripeToken // token for the card
})
.then(customer =>
stripe.charges.create({ // charge the customer
amount,
description: "Sample Charge",
currency: "usd",
customer: customer.id
}))
.then(charge => res.render("pay")); // render the payment successful alter page after payment
 
});
 
// app listening on port 8000
app.listen(8000, () => {
console.log('server is running on port 8000');
});
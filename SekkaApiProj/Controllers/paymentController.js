const Stripe = require("stripe");

const stripe = new Stripe('sk_test_51Ihh3pLQxH57LdTX7dmP10qMteyvFAMFypqCddTMnay5QBGfJrdDBSBhdiWloNjRjttGI3dUVHTrVfGVgsTc8hm400jlsjbbsO',{
    apiVersion:"2020-08-27",

});

const payment = async (req, res, next) => {
    console.log("body", req.body);
    const paymentIntent = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"egp"
    })
    res.send({
        clientSecret:paymentIntent.client_secret,
    })
  };


  module.exports={
    payment
  }
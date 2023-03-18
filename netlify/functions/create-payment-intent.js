// eslint-disable-next-line
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async event => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};

/*Had a lot of trouble with stripe. Tried different methods:
  1) Disable adblockers in browser 
  2) "statusCode" instead of "status" in node handler function
  3) // eslint-disable-next-line before require in this file
*/

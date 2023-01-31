const express = require("express");
const app = express();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items[0].amount);
  return items[0].amount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const { currency } = req.body;//parametro moneda apra asignar mas rapido

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/greet", async (req, res) =>{
    res.send("oh esto si funciona");
});

/*CONEXION DE MANERA LOCAL
app.listen(3000, () => console.log("Node server listening on port 3000!"));
*/

//conexion con un servidor externo dodne se eligen los puertos
const PORT = process.env.PORT || 5001; //que elija cualquier puerto o el 5001
app.set('port', process.env.PORT);//ponemos el puerto
app.listen(PORT, () => console.log("Node server lsiten on port $(PORT)!"));

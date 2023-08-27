const express = require("express");
const app = express();

const http = require("http");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const checkauth = require("./services/checkAuth")
const cors = require("cors");
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

const ProductRouter = require("./routes/Product");
const UserRouter = require("./routes/User");
const AuthRouter = require("./routes/Auth");
const OrderRouter = require("./routes/Order");
const CartRouter = require("./routes/Cart");



const { Order } = require("./models/Order");
const { Product } = require("./models/Product");

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (request, response) => {
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     // Handle the event
//     switch (event.type) {
//       case "payment_intent.succeeded":
//         const paymentIntentSucceeded = event.data.object;

//         const order = await Order.findById(
//           paymentIntentSucceeded.metadata.orderId
//         );
//         order.paymentStatus = "received";
//         await order.save();

//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// );

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello node js You are superb");
});

app.use("/products", checkauth, ProductRouter.router);
app.use("/user",checkauth, UserRouter.router);
app.use("/auth", AuthRouter.router);
app.use("/order",checkauth, OrderRouter.router);
app.use("/cart",checkauth, CartRouter.router);



// for bulk upload

// app.post("/upload", async (req, res) => {
//   try {
//     const products = req.body; // Assuming the request body contains an array of products

//     for (let i = 0; i < products.length; i++) {
//       delete products[i].id;
//       const product = new Product(products[i]);
//       await product.save();
//     }


//     res.json({ message: "Products uploaded successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error uploading products" });
//     console.log(error);
//   }
// });

// stript
const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, orderId } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // for decimal compensation
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

main().catch((err) => console.log(err));

async function main() {
  mongoose
    .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
    .then(() => {
      console.log("mongo_db connected");
    });
}

const htttpServer = http.createServer(app);
htttpServer.listen(port, () => {
  console.log("Server is running on port 4000");
});

const { Order } = require("../models/Order");
const { Product } = require("../models/Product");
const { User } = require("../models/User");
const { sendMail, invoiceTemplate } = require("../services/common");
const stripe = require('stripe')('sk_test_51NivbySHnCqcpMx1mMbXSPvau9M6fvjxzWC6SmkUQG7jT2LXmN726SPsMmLhd8Hzl0l6EmgrMNQzPulhVlVXIynm00jeDCpT2v');


exports.CreateOrder = async (req, res) => {
  const order = new Order(req.body);
  // here we have to update stocks;

  for (let item of order.items) {
    let product = await Product.findOne({ _id: item.product.id });
    product.$inc("stock", -1 * item.quantity);
    // for optimum performance we should make inventory outside of product.
    await product.save();
  }
  try {
    let doc = await order.save();
    const user = await User.findById(order.user)
    // we can use await for this also
    console.log(doc,"mail")
    // sendMail({to:user.email,html:invoiceTemplate(order),subject:'Order Received' })
    res.status(201).json(doc);
  } catch (error) {
    res.status(401).json(error);
  }
};



exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    let order = await Order.findByIdAndUpdate(id, req.body);

    res.status(201).json(order);
  } catch (error) {
    res.status(401).json(error);
  }
};






exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete({ id });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};




// for admin
exports.fetchAllOrders = async (req, res) => {
  let query = Order.find({});
  let totalOrderQuery = Order.find({});

  //TODO : How to get sort on discounted Price not on Actual price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    // console.log(await query.exec(),"query")
  }

  if (req.query.search_query) {
    console.log(req.query.search_query, "req.query.search_query");
    query = query.find(req.query.search_query);
  }

  const totalDocs = await totalOrderQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};



exports.fetchOrdersByUser = async (req, res) => {
  let query = Order.find({user:req.body.id});

  let totalOrderQuery = Order.find({user:req.body.id});

  const totalDocs = await totalOrderQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    console.log(docs,"query")
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};




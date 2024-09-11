const { ObjectId } = require("mongodb");
const stripe = require("stripe")(
  "sk_test_51PuzQeAeVmKMN0Irk0gQjETsujJU6Mra8b8E2f7eVLU1uWM0vTEl6TKBpfquUNmvbj8opSjvJGPMJhtLEQhuwtuQ00JErIDoGE"
);

async function uploadBook(req, res, bookCollections) {
  const data = req.body;
  const result = await bookCollections.insertOne(data);
  res.send(result);
}

async function getAllBooks(req, res, bookCollections) {
  let query = {};
  if (req.query?.category) {
    query = { category: req.query.category };
  }
  const result = await bookCollections.find(query).toArray();
  res.send(result);
}

async function updateBook(req, res, bookCollections) {
  const id = req.params.id;
  const updateBookData = req.body;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = { $set: { ...updateBookData } };
  const options = { upsert: true };
  const result = await bookCollections.updateOne(filter, updatedDoc, options);
  res.send(result);
}

async function deleteBook(req, res, bookCollections) {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollections.deleteOne(filter);
  res.send(result);
}

async function getSingleBook(req, res, bookCollections) {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollections.findOne(filter);
  res.send(result);
}

async function paymentSession(req, res) {
  const { products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No products found" });
  }

  const item = products[0]; 

   if (!item.title || !item.price) {
    return res.status(400).json({ error: "Product missing title or price" });
  }

  const lineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        images: [item.imageUrl], 
      },
      unit_amount: item.price * 100, 
    },
    quantity: item.quantity || 1, 
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItem],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
}



module.exports = {
  uploadBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getSingleBook,
  paymentSession
};
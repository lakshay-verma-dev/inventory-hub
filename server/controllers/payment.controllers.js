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

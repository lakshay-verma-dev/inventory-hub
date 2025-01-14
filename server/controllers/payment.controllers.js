import stripe from "stripe";
import { config } from "dotenv";
config()

const stripeInstance = stripe(process.env.STRIPE_KEY); // Replace with your Stripe secret key

async function paymentSession(req, res) {
  const { products } = req.body;

  // Check if products are provided
  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No products found" });
  }

  // Create line items from products
  const lineItems = products.map((item) => {
    if (!item.title || !item.price) {
      throw new Error("Product missing title or price");
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity || 1,
    };
  });

  try {
    // Create Stripe session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    // Respond with session ID
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
}

export { paymentSession };

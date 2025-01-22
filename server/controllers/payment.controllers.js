import stripe from "stripe";
import { config } from "dotenv";
config();

const stripeInstance = stripe(process.env.STRIPE_KEY); 
const frontendURL = process.env.FRONTEND_API;

async function paymentSession(req, res) {
  const { products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No products found" });
  }
  const lineItems = products.map((item) => {
    if (!item.title || !item.price) {
      throw new Error("Product missing title or price");
    }

    const unitAmountInCents = Math.round(item.price * 100); 

    return {
      price_data: {
        currency: "usd", // Use the appropriate currency
        product_data: {
          name: item.title,
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        unit_amount: unitAmountInCents, // Ensure unit_amount is an integer
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
      success_url: `${frontendURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendURL}/cancel`,
    });

    // Respond with session ID
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
}

export { paymentSession };

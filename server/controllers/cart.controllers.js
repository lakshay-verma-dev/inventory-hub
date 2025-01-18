import Cart from "../models/cart.models.js"; // Replace with your actual model

const saveCart = async (req, res) => {
  const { cartData } = req.body; // Get the cartData directly from req.body

  // Ensure cartData has email and items
  if (
    !cartData ||
    !cartData.email ||
    !cartData.items ||
    cartData.items.length === 0
  ) {
    return res.status(400).json({ message: "Invalid cart data" });
  }

  try {
    let cart = await Cart.findOne({ email: cartData.email });

    if (cart) {
      cart.items = cartData.items;
      await cart.save(); 
    } else {
      cart = new Cart({
        email: cartData.email,
        items: cartData.items,
      });
      await cart.save(); 
    }

    return res.status(200).json({ message: "Cart saved successfully", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to save cart" });
  }
};

const getCart = async (req, res) => {
  const { email } = req.params; 
  try {
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export {saveCart,getCart}


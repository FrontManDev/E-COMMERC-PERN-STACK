const prisma = require('../../config/database');
const AddToCart = async (req, res) => {
    try {
        const { ProductId, UserId } = req.body;
        if (!ProductId || !UserId) {
            return res.status(400).json({ message: "bad requist" })
        }

        const CartExsiste = await prisma.cart.findUnique({
            where: {
                UserId: UserId
            }
        })

        if (!CartExsiste) {

            const cart = await prisma.cart.create({
                data: {
                    UserId: UserId
                }
            });

            if (!cart) {
                return res.status(500).json({ message: "error withe creating the cart " });
            }

            const cartitem = await prisma.cartItem.create({
                data: {
                    ProductId: ProductId,
                    CartId: cart.id
                }
            })

            if (!cartitem) {
                return res.status(500).json({ message: "error with creating the cartitem" });
            }

            return res.status(200).json({ message: "the products is added succesfully", cartitem: cartitem });
        }


        const Existecartitem = await prisma.cartItem.findUnique({
            where: {
                ProductId_CartId: {
                    ProductId: ProductId,
                    CartId: CartExsiste.id
                }
            }
        });

        if (!Existecartitem) {
            const cartItem = await prisma.cartItem.create({
                data: {
                    ProductId: ProductId,
                    CartId: CartExsiste.id
                }
            });
            if (!cartItem) {
                return res.status(500).json({ message: "error with creating the cartitem" });
            }
            return res.status(200).json({ message: "the products is added succesfully", cartItem: cartItem });
        }

        const cartItem = await prisma.cartItem.update({
            where: {
                ProductId_CartId: {
                    ProductId: ProductId,
                    CartId: CartExsiste.id
                }
            },
            data: {
                Quantity: Existecartitem.Quantity + 1
            }
        });
        
        return res.status(200).json({ message: "the products is added succesfully", cartItem: cartItem });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { AddToCart };
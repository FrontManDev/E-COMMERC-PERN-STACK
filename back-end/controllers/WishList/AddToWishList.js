const prisma = require('../../config/database');

const AddToWishList = async (req, res) => {
    try {
        const { ProductId, UserId } = req.body;

        if (!ProductId || !UserId) {
            return res.status(400).json({ message: "bad request: ProductId and UserId are required" });
        }

        let wishlist = await prisma.wishlist.findUnique({
            where: {
                UserId: UserId
            }
        });

        if (!wishlist) {
            wishlist = await prisma.wishlist.create({
                data: {
                    UserId: UserId
                }
            });

            if (!wishlist) {
                return res.status(500).json({ message: "Error while creating the wishlist" });
            }
        }

        const existingItem = await prisma.wishlistItem.findUnique({
            where: {
                ProductId_WishlistId: {
                    productsId: ProductId,
                    WishlistId: wishlist.id
                }
            }
        });

        if (existingItem) {
            return res.status(400).json({ message: "Product already exists in wishlist" });
        }

        const wishlistItem = await prisma.wishlistItem.create({
            data: {
                productsId: ProductId,
                WishlistId: wishlist.id
            }
        });

        return res.status(200).json({
            message: "Product successfully added to wishlist",
            wishlistItem
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { AddToWishList };

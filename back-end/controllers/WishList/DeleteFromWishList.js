const prisma = require('../../config/database');

const DeleteFromWishList = async (req, res) => {
    try {
        const { ProductId, UserId } = req.body;

        if (!ProductId || !UserId) {
            return res.status(400).json({ message: "bad request" });
        }

        const wishlist = await prisma.wishlist.findUnique({
            where: {
                UserId: UserId
            }
        });

        if (!wishlist) {
            return res.status(404).json({ message: "wishlist not found" });
        }

        const deletedItem = await prisma.wishlistItem.deleteMany({
            where: {
                WishListId: wishlist.id,
                ProductId: ProductId
            }
        });

        if (deletedItem.count === 0) {
            return res.status(404).json({ message: "item not found in wishlist" });
        }

        return res.status(200).json({ message: "item deleted from wishlist successfully" });

    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { DeleteFromWishList };

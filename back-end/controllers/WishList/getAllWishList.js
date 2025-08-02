const prisma = require('../../config/database');

const GetAllWishList = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'bad request' });
        }

        const wishlist = await prisma.wishlist.findUnique({
            where: {
                UserId: id
            }
        });

        if (!wishlist) {
            return res.status(404).json({ message: "wishlist not found" });
        }

        const wishlistItems = await prisma.wishlistItem.findMany({
            where: {
                WishlistId: wishlist.id
            }
        });

        if (!wishlistItems || wishlistItems.length === 0) {
            return res.status(404).json({ message: "No items found in wishlist" });
        }

        const productsIds = wishlistItems.map((item) => item.productsId);

        const products = await prisma.products.findMany({
            where: {
                id: {
                    in: productsIds
                }
            }
        });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products not found" });
        }

        return res.status(200).json({
            message: "All products in the wishlist:",
            WishListProducts: products
        });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { GetAllWishList };

const prisma = require('../../config/database');
const MinuseFromWishList = async (req,res)=>{
    try {
        const { ProductId, UserId } = req.body;
        if (!ProductId || !UserId) {
            return res.status(500).json({ message: "bad requist" });
        }
        const WishlistItem = await prisma.wishlistItem.findUnique({
            where: {
                ProductId_WishlistId: {
                    ProductId: ProductId,
                    UserId: UserId
                }
            }
        });

        const WishlistItemUpdate = await prisma.wishlistItem.update({
            where: {
                ProductId_WishlistId: {
                    ProductId: ProductId,
                    UserId: UserId
                }
            },
            data:{
                Quantity: WishlistItem.Quantity-1
            }
        });
        if(!WishlistItemUpdate){
            return res.status(500).json({message:"error in database"});
        }

        return res.status(200).json({message:"succes fully"});
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = {MinuseFromWishList};
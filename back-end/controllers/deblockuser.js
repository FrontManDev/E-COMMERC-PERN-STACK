const prisma = require("../config/database");
const deblockuser = async (req, res) => {
    try {
        const id = req.params.id;
        const deblockuser = await prisma.users.update({
            where: {
                id
            }, data: {
                Status: "OFFLINE"
            }
        });
        if (!deblockuser) {
            return res.status(500).json({ message: "error  in database" });
        }
        return res.status(200).json({ message: "user is blocked susecfully", deblockuser: deblockuser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = { deblockuser };
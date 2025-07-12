const prisma = require('../../config/database');

const allusers = async (req, res) => {
    try {
        const AllUsers = await prisma.users.findMany();
        const totlausers = await prisma.users.count();
        const blockusers = await prisma.users.count({
            where: { Status: "BLOCK" }
        });
        const onlineusers = await prisma.users.count({
            where: { Status: "ONLINE" }
        });
        const offlineusers = await prisma.users.count({
            where: { Status: "OFFLINE" }
        });

        if (!AllUsers || !totlausers) {
            return res.status(500).json({ message: "error in database" });
        }

        return res.status(200).json({
            message: "number of users and all users",
            totlausers,
            AllUsers,
            blockusers,
            onlineusers,
            offlineusers
        });
    } catch (Error) {
        return res.status(500).json({ Error: Error.message });
    }
}

module.exports = { allusers };

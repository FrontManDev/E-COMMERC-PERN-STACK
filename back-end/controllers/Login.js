const prisma = require("../config/database");
const bcrypt = require("bcrypt");
const { AccesTokenGenerate } = require('../util/TokensGenerate');
const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: "all feilds is requirde" });
        }

        const ExisteUser = await prisma.users.findUnique({
            where: { Email }
        });

        if (!ExisteUser) {
            return res.status(400).json({ message: "inccorect password or email" });
        }

        const IsMatch = await bcrypt.compare(Password, ExisteUser.Password);

        if (!IsMatch) {
            return res.status(400).json({ message: "inccorect password or email" });
        }

        await prisma.users.update({
            where: {
                Email: Email
            },
            data: {
                Status: "ONLINE"
            }
        });
        const token = AccesTokenGenerate(ExisteUser);
        // user login successfully
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 60 * 60 * 1000,
        });
        return res.status(200).json({ message: `Wellcome back ${ExisteUser.FirstName}`, ExisteUser, token: token });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { Login }; 

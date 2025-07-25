const prisma = require("../config/database");
const bcrypt = require('bcrypt');
const { AccesTokenGenerate } = require('../util/AccesTokensGenerate');
const { RefrechTokensGenerate } = require('../util/RefrechTokensGenerate');
const Singeup = async (req, res) => {
    try {
        // destructuring of JSON data 
        const { FirstName, LastName, Address, Email, Password } = req.body;

        // destructuring of file data
        const ProfileImage = req.file;

        // validate required fields
        if (!FirstName || !LastName || !Address || !Email || !Password || !ProfileImage) {
            return res.status(400).json({ Error: "All form fields are required" });
        }

        const EmailExiste = await prisma.users.findUnique({
            where: {
                Email: Email
            }
        });

        if (EmailExiste) {
            return res.status(400).json({ Error: "this Email is used before" });
        }
        const HashPassword = await bcrypt.hash(Password, 10);
        // create a new user
        const NewUser = await prisma.users.create({
            data: {
                FirstName,
                LastName,
                Address,
                Email,
                Password: HashPassword,
                Role: "USER",
                ProfileImage: ProfileImage.filename,
                Status: "ONLINE"
            }
        });

        // verify if user was created
        if (!NewUser) {
            return res.status(500).json({ Error: "Error in database" });
        }
        const accestoken = AccesTokenGenerate(NewUser);
        const refrechtoken = RefrechTokensGenerate(NewUser);
        // user created successfully
        res.cookie("refrechtoken", refrechtoken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }); 
        return res.status(200).json({ message: "The user was added successfully", NewUser, token: accestoken });

    } catch (error) {
        // send the error if it exists
        return res.status(500).json({ Error: error.message });
    }
};

module.exports = { Singeup };

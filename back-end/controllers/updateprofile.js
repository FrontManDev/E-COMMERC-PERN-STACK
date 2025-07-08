const prisma = require('../config/database');
const bcrypt = require('bcrypt');
const updateprofile = async (req, res) => {
    try {
        const { FirstName, LastName, Address, Email, Password, } = req.body;
        const ProfileImage = req.file?.filename;
        const id = req.params.id;

        if (!FirstName && !LastName && !Address && !Email && !Password && !ProfileImage) {
            return res.status(400).json({ message: "you have to update atleast one info" });
        }
        const updatedata = {};
        if (FirstName) updatedata.FirstName = FirstName;
        if (LastName) updatedata.LastName = LastName;
        if (Address) updatedata.Address = Address;
        if (Email) updatedata.Email = Email;
        if (Password) updatedata.Password = await bcrypt.hash(Password, 10);;
        if (ProfileImage) updatedata.ProfileImage = ProfileImage;
        const updateUser = await prisma.users.update({
            where: {
                id: id
            },
            data:updatedata
        });

        if (!updateUser) {
            return res.status(500).json({ message: "error with updating the data"});
        }
        return res.status(200).json({ message: "user updated data susfully",User : updateUser});
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

module.exports = { updateprofile };
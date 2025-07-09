const prisma = require('../config/database');
const allusers = async (req,res)=>{
    try{
        const AllUsers = await prisma.users.findMany();
        const numberOfUser = await prisma.users.count();
        if(!AllUsers || !numberOfUser ){
            return res.status(500).json({message:"error in database"})
        }
        return res.status(200).json({message:"number of users and all users ",numberOfUser,AllUsers:AllUsers});
    }catch(Error){
        return res.status(500).json({Error : Error.message});
    }
}
module.exports = {allusers}
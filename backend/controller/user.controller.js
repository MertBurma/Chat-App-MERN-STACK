import User from "../models/user.model.js";

export const getUsersForSideBar = async (req,res) => {
try {
    const loggedUserId = req.user._id

    const allUsersFiltered = await User.find({_id: {
        $ne:loggedUserId
    }}).select("-password")

    
    res.status(200).json(allUsersFiltered);
    
} catch (error) {
    console.log("Error in getUserForSideBar",error.message)
    res.status(500).json({error:"Internal server error"});
}
}
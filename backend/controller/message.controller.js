import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage =async (req,res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let convertastion =await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            },
        })
        if(!convertastion) {
            convertastion = await Conversation.create({
                participants:[senderId,receiverId],

            })
        }
        const newMessage = new Message({
            senderId,
			receiverId,
			message,

        })
        if(newMessage) {
            convertastion.messages.push(newMessage._id);
        }

        //SOCKET IO FUNCTİONALLY

       

        await Promise.all([convertastion.save(),newMessage.save()]);

        res.status(200).json(newMessage);
        

        
    } catch (error) {
        console.log("Error in Message in",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMessages = async(req,res) => {
    try {
        const  {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,userToChatId]
            },

        }).populate("messages")
        res.status(200).json(conversation.messages);

        
    } catch (error) {
        console.log("Error in getMessage in",error.message);
        res.status(500).json({error:"Internal server error"});
        
    }
}
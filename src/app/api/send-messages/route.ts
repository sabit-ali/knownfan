import ConnectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { Message } from "@/models/userModel";
import mongoose from "mongoose";

export async function POST(request:Request){
    await ConnectDB()
    const {username, content } =  await request.json()
    try {
      const user = await UserModel.findOne({username})

      if(!user){
        return Response.json(
            {
                success:false,
                message:"user not found"
            }
        )
      }

      if(!user.isAcceptingMessages){
      return Response.json(
            {
                success:false,
                message:"user not accepting message "
            },{status:400}
        )
      }

      const newMessage = {content, createdAt : new Date()}
       user.messages.push(newMessage as Message)
       await user.save()

       return Response.json(
        {
            success:true,
            message:"Message send Successfully "
        },{status:200}
    )
    } catch (error) {
        return Response.json(
            {
                success:false,
                message:"Message Sending Error"
            },{status:500}
        )
    }
}
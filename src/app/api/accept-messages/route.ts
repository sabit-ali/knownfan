import { getServerSession } from "next-auth";
import ConnectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";


export async function POST(request: Request) {
    await ConnectDB()
    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'user not authenticate',
        }, { status: 403 })
    }

    const userId = user._id
    const {acceptMessages} = await request.json()

    try {
       const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages:acceptMessages},
            {new : true}
        )

        if(!updatedUser){
            return Response.json(
                {
                    success:false,
                    message:'user not found'
                },{status:500}
            )
        }
        return Response.json(
            {
                success:true,
                message:'message acceptance status updated successfully',
                updatedUser
            },{status:201}
        )
    } catch (error) {
        return Response.json(
            {
                success:false,
                message:'failed to update user status to accept messages'
            },{status:500}
        )
    }

}

export async function GET(request:Request){
    await ConnectDB()
   const session = await getServerSession(authOptions)
   const user:User = await session?.user

   if(!session || !session.user){
    return Response.json({
        success:false,
        message:'User not authenticate'
    },{status:400})
   }

  const userId =  user._id

 try {
    const FoundUser = await UserModel.findById({userId})

    if(!FoundUser){
      return Response.json(
          {
              success:false,
              message:'User not found ...'
          },{status:500}
      )
    }
    return Response.json(
      {
          success:true,
          isAcceptingMessages : FoundUser.isAcceptingMessages
      },{status:200}
  )
 } catch (error) {
    return Response.json(
        {
            success:false,
            message:'Error is getting messages acceptance status',
        },{status:200}
    )
 }
}
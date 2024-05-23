import mongoose from "mongoose";
import { DB_Name } from "./constance";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

const ConnectDB = async (): Promise<void> => {
    if(connection.isConnected){
        console.log('connection already existed !')
        return 
    }
    try {
      const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
       connection.isConnected = db.connections[0].readyState
       console.log('MongoDB connection is successfully ...')
    } catch (error) {
        console.log('mongoDB connection error')
        process.exit(1)
    }
}

export default ConnectDB
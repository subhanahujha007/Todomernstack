import mongoose  from "mongoose"
export const connect=async()=>{try {
    
    const connectioninstance=await mongoose.connect(`${process.env.MONGOBDURL}/${process.env.DATABASENAME}`)
    console.log(`Database is connected on host :${  connectioninstance.connection.host}`)
} catch (error) {
 console.error(error)   
}
}
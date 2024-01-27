export const Asynchandler=(handlerequest)=>{
    return (req,res,next)=>{
            Promise.resolve(handlerequest(req,res,next)).catch((err)=>{console.error(err)})
    }
}
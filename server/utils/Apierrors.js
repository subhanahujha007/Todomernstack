class Apierrors extends Error{
    constructor(
        message="something went wrong",
        statuscode,
        errors=[],
        stack=""
    ){
        super(message)
    message=this.message,
    statuscode=this.statuscode,
    this.errors=errors

if(stack){
this.stack=stack;
}
else{
Error.captureStackTrace(this,this.constructor)
}
}
}
export {Apierrors}
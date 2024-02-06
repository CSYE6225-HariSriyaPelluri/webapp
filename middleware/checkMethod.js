function checkMethodType(req,res,next){
    
    if(req.method!="GET"){
        res.status(405).json().send();
    }
    else{
        next();
    }
};

module.exports=checkMethodType
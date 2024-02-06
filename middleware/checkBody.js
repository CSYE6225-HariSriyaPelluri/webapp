function checkBody(req,res,next){
    
    if(req.headers["content-length"]>0 || Object.keys(req.query).length > 0){
        return res.status(400).json().send();
    }
    else{
        next();
    }
};

module.exports=checkBody
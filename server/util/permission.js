exports.foradmin = (req,res, next) => {
    if(!req.session.role){
            return res.status(401).json({
                msg: "You dont have permission to do this",
            });
    
    }
    next();
}


exports.formanager = (req,res,next) => {
    if(req.session.role != "manager" && req.session.role != "admin"){
            return res.status(401).json({
                msg: "You dont have permission to do this",
            });
        }
        next();
    }

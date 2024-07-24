import jwt from 'jsonwebtoken'


const isAuthenticated = async(req,res,next) => {
    console.log(req.headers);
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(' ')[1];
    //! Verify the token
    const verifyToken = jwt.verify(token,'sunnyToken',(err,decoded) => {
        if(err) return false
        return decoded;
    })

    if(verifyToken){
        //! Save the user req obj
        req.user = verifyToken.id;
        next();
    }else{
        const err =  new Error('Token expired, login again');
        next(err);
    }

}

export default isAuthenticated;
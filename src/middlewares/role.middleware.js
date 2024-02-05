export const roleValidation = (role) => {
    return (req, res, next) => {
        console.log(req.user)
        if(req.user.role !== role){
            return res.status(403).json({message : 'Not authorized. Only admin.'})
        }
        next();
    }
}
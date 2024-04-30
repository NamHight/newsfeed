class UserController {
    // hallder callback
    index(req,res){
        res.render('user');
    }

}

module.exports = new UserController;
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    'new': function (req, res) {
        res.view();
    },
    
    'create': function(req, res, next){
        
        var userObj = {
            name: req.param('name'),
            title: req.param('title'),
            email: req.param('email'),
            password: req.param('password'),
            confirmation: req.param('confirmation')
        }
        
        //create a user with the params sent from the sign-up form --> new.ejs
        User.create(userObj,function userCreated(err, user){
            
            //if there's an error
            if(err){
                req.session.flash = {
                    err: err
                }
                //if error redirect to signup page
                return res.redirect('/user/new');
            }
            //log user in
            req.session.authenticated = true;
            req.session.User = user;
            
            //after successfully creating the user redirection to the show action
            // From ep1-6: //res.json(user);
            
            res.redirect('/user/show/'+user.id);
        });
        
    },
    'show': function(req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err){ return next(err); }
            if(!user) return next();
            
            res.view({
                user: user
            });
            
        });
        
    },
    'index': function(req, res, next) {
        
        //Get an array of all users in the User collection(eg table)
        User.find(function foundUsers(err, users){
            if(err){ return next(err)}
            res.view({
                users: users
            });
        });
        
    },
    
    //render the edit view (e.g. /views/edit.ejs)
    edit: function(req, res, next) {
        //Find the user from the id passed in via params
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err){ return next(err)};
            if(!user){ return next()};
            
            res.view({
                user: user
            });
            
        })
        
    },
    
    //process the info from edit view
    update: function(req, res, next) {
        if(req.session.User.admin){
            var userObj = {
                name: req.param('name'),
                title: req.param('title'),
                email: req.param('email'),
                admin: req.param('admin')
            }
        }else{
            var userObj = {
                name: req.param('name'),
                title: req.param('title'),
                email: req.param('email')
            }            
        }
        User.update(req.param('id'), userObj, function userUpdated(err){
            if(err){
                //console.log(err);
                return res.redirect('/user/edit/' + req.param('id'));
            };
            
            res.redirect('/user/show/' + req.param('id'))
            
        })
        
    },
    
    destroy: function (req, res, next){
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err){return next(err);}
            if(!user){return next('User dont exist.');}
            User.destroy(req.param('id'), function userDestroyed(err){
                if(err){return next(err);}
            });
            
            res.redirect('/user')
            
        });
        
    }
	
};


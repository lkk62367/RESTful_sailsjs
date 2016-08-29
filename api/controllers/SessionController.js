/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require("bcrypt");
module.exports = {
    
    'new': function(req, res){
        res.view('session/new');
    },
    'create': function(req, res, next){
    	//check for email and password in params sent via the form, if none
    	//redirect the browser back to the sign-in form.
    	if(!req.param('email') || !req.param('password')){
    		//return next({err:["Password doesnt match password confirmation."]})
    		var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password'}];
    	    //remember that err is the object being passed down (a.k.a flash.err), whose value is another object with the key of 
    	    //usernamePasswordRequiredError
    		req.session.flash = {
    			err: usernamePasswordRequiredError
    		}
          	res.redirect('/session/new');
        	return;  	
    	}
    	//Try to find the user by there email address.
        //findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute
        User.findOneByEmail(req.param('email'), function foundUser(err, user){
	        if(err){ return next(err)}
	        //if no user if found
    	    if(!user){
        		var noAccountError = [{name:'noAccount', message: 'The email address'+req.param('email')+' not found.'}];
        		req.session.flash = {
        			err: noAccountError
        		}
        		res.redirect('/session/new');
        		return;
	        }
	        //compare password from the form params to the encrypted password of the suer found.
            bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
	            if(err){ return next(err);}
            	if(!valid){
            		var usernamePasswordMismatchError = [{name: 'usernamePasswrodMismatch', message: 'Invalid username and password combination.'}];
            		req.session.flash = {
            			err: usernamePasswordMismatchError
            		}
            		res.redirect('/session/new');
            		return;
            	}

        	//log user in
        	req.session.authenticated = true;
        	req.session.User = user;
        	
        	if(req.session.User.admin){
        	    res.redirect('/user');
        	    return;
        	}
        
        	//redirect to their profile page(eg /views/user/show.ejs)
        	res.redirect('/user/show/' + user.id)

            });
        });
    },
    'destroy': function(req, res, next){
    	//wipe out the session (log out)
    	req.session.destroy();
    	
    	//Redirect the browser to the sign-in screen
    	res.redirect('/session/new');
    }

	
};


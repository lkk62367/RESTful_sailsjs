/**
 * Allow a loggedin user to see, edit and update his/her own policy
 * Allow admin to see everyone
 */
 
module.exports = function(req, res, ok){
    var sessionUserMatchesID = req.session.User.id === req.param('id');
    var isAdmin = req.session.User.admin;
    
    //The requested id doesnt match the user's id
    //and this is not an admin
    if(!(sessionUserMatchesID || isAdmin)){
        var noRightsError = [{name: 'noRightsError', message: 'You must be an admin'}]
        req.session.flash = {
            err:noRightsError
        }
        res.redirect('/session/new');
        return;
        
    }
    return ok();
}
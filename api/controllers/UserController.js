module.exports = {
    'new': function(req, res){
        //res.locals.flash = _.clone(req.session.flash);
        res.view();
        //req.session.flash = {};
    },

    create: function (req, res, next) {
      User.create(req.params.all(), function userCreated(err,user){
          //if(err) return next(err);

          if(err){
            console.log(err);
            req.session.flash = {
              err: err
            }
            //if error redirect back to sign-up page
            return res.redirect('/user/new');
          }
        //res.json(user);
        //req.session.flash = {};
        res.redirect('/user/show/'+user.id);
      });
    },
    //render the profile view (e.g. /views/show.ejs)
    show: function(req, res, next){
      User.findOne(req.param('id'), function foundUser(err, user){
        if(err) return next(err);
        if(!user) return next();
        res.view({
          user: user
        });
      });
    },

        show: function(req, res, next){
      User.findOne(req.param('id'), function foundUser(err, user){
        if(err) return next(err);
        if(!user) return next();
        res.view({
          user: user
        });
      });
    },

    index: function(req, res, next){
      console.log("hi! there!");
      //Get an array of all users in the User collection(e.g. table)
      User.find(function foundUsers(err, users){
        if(err) return (err);
        //pass the array down to the /views/index.ejs page
        res.view({
          users: users
        });
      });
    },
    //render the edit view (e.g. /views/edit.ejs)
edit: function(req, res, next){
    console.log("hi, edit!");

    //Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user){
      if(err) return next(err);
      if(!user) return next('User doesn\'t exist.');

      res.view({
        user: user
      });
    });
},


  // process the info from edit view
  update: function(req, res, next){
    User.update(req.param('id'), req.params.all(), function userUpdated(err){
      if (err){
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  },
  destroy: function(req, res, next){
    console.log("Hi, destroy");
    User.findOne(req.param('id'), function foundUser(err, user){
      if (err) return next(err);
      if(!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if(err) return next(err);
      });

      res.redirect('/user');

  });
},



};

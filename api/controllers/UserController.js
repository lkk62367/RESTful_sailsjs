module.exports = {
    'new': function(req, res) {
        //res.locals.flash = _.clone(req.session.flash);
        res.view();
        //req.session.flash = {};
    },

    create: function(req, res, next) {
                var userObj = {
            name: req.param('name'),
            title: req.param('title'),
            email: req.param('email'),
            password: req.param('password'),
            confirmation: req.param('confirmation')
        }

        User.create(req.params.all(), function userCreated(err, user) {
            //if(err) return next(err);

            if (err) {
                console.log(err);
                req.session.flash = {
                        err: err
                    }
                    //if error redirect back to sign-up page
                return res.redirect('/user/new');
            }
            //res.json(user);
            //req.session.flash = {};
            req.session.authenticated = true;
            req.session.User = user;


            res.redirect('/user/show/' + user.id);
        });
    },
    //render the profile view (e.g. /views/show.ejs)


    show: function(req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user
            });
        });
    },

    index: function(req, res, next) {
        console.log(new Date());
        console.log(req.session.authenticated);
        console.log("hi! there!");
        //Get an array of all users in the User collection(e.g. table)
        User.find(function foundUsers(err, users) {
            if (err) return (err);
            //pass the array down to the /views/index.ejs page
            res.view({
                users: users
            });
        });
    },
    edit: function(req, res, next) {
        console.log("hi, edit!");

        //Find the user from the id passed in via params
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');

            res.view({
                user: user
            });
        });
    },



update: function (req, res, next) {
  console.log(req.params.all());
  var values = req.allParams();
  console.log(values.admin);
  if(values.admin != undefined && values.admin.constructor === Array){
    if(values.admin[1] === 'on'){
      values.admin = true;
    }
  }

  var userObj = {
    name: req.param('name'),
    title: req.param('title'),
    email: req.param('email')
  }

  if(req.session.User.admin){
    userObj.admin = values.admin;
  }

  //replace req.params.all with userObj
  User.update(req.param('id'), userObj, function userUpdated(err) {
    if (err) {
      return res.redirect('/user/edit/' + req.param('id'));
    }

    res.redirect('/user/show/' + req.param('id'));
  });
},







  destroy: function(req, res, next) {
        console.log("Hi, destroy");
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');

            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err) return next(err);
            });

            res.redirect('/user');

        });
    },
  subscribe: function(req, res) {

    // Find all current users in the user model
    User.find(function foundUsers(err, users) {
      if (err) return next(err);

      // subscribe this socket to the User model classroom
      User.subscribe(req.socket);

      // subscribe this socket to the user instance rooms
      User.subscribe(req.socket, users);

      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });
  }
};

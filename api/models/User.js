module.exports = {
    schema: true,

    attributes: {
        name: {
            type: 'string',
            required: true
        },

        title: {
            type: 'string'
        },

        email: {
            type: 'email',
            required: true,
            unique: true
        },

        encryptedPassword: {
            type: 'string'
        },
        //toJSON: function(){
        // var obj = this.toObject();
        //  delete obj.password;
        //  delete obj.confirmation;
        // delete obj.encryptedPassword;
        //  delete obj._csrf;
        //  return obj;
        //}

    }
};

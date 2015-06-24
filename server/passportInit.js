var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Marker = mongoose.model('Marker');


module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
    console.log('serializing user:',user.username);
    done(null, user._id);
    });
    
    //Desieralize user will call with the unique id provided by serializeuser
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user.username);
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false);                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
    }
);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user in mongodb with provided username
            User.findOne({username: username}, function(err, user){

                if (err) {
                    console.log('Signup Error: ' + err);
                    return  done(err);
                }
                // user exists alrady
                if (user) {
                    console.log('user exists with name: ' + username);
                    return done(null, false);
                } else {
                    //crate user if not exist
                    var newUser = new User();

                    //ser user credentials
                    newUser.username= username;
                    newUser.password = createHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err) {
                            console.log('error in saving user: ' + err);
                            throw err;
                        }
                        console.log(newUser.username + ' is now registered!');
                        return done(null, newUser);
                    })
                }
            });

            var newUser = new User();
            newUser.username = username;
            newUser.password= createHash(password);

            newUser.save(function(err){
                if (err){
                            console.log('Error in Saving user: '+err);  
                            throw err;  
                        }
                console.log(newUser.username + ' Registration succesful');    
                return done(null, newUser);
            })


            
            console.log(newUser.username + ' Registration successful');
            console.log('with password hash ' + newUser.password);
            return done(null, newUser);
        })
    );
    
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
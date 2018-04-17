//requiring passport npm module
const passport = require('passport'); 

//create a new arrow function and wrapped the route handlers.
//exporting a function from the file, calling this function with the express (app) object
module.exports = app => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );
    
app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/surveys');
    }
);

app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


app.get('/api/current_user',(req, res) =>{
    res.send(req.user);
});
};





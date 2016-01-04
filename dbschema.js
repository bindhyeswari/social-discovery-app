/**
 * Created by administrator on 12/22/15.
 */

var Sequelize = require('sequelize');
// var sequelize = new Sequelize('mysql://root@127.0.0.1:3306/socialapp_schema', {})

var sequelize = new Sequelize('socialapp_schema', 'root', 'manali');
sequelize.authenticate().then(function (errors) {
    //console.log(errors);
}, function (errors) {
    console.log(errors);
});

console.log('running query ... ');
sequelize.query('SELECT * FROM Master_Distance;').then(function (args) {
    console.log(args);
});

/*
var User = sequelize.define('User', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password:Sequelize.STRING,
    birthday:Sequelize.DATE,
    gender:Sequelize.STRING
});

sequelize.sync({ force: true }).success(function(err) {
    User.findOrCreate({
        username:'Manali',
        email:"manali8785@gmail.com",
        password:"manali",
        birthday:"1/1/2009",
        gender:"female"
    }).success(function(user,created){
        console.log(user.values);
        console.log(created);
    });
});
*/

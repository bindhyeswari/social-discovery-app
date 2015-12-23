/**
 * Created by bindhyeswarimishra on 12/23/15.
 */

var Sequelize = require('sequelize');

var sequelize = new Sequelize('test', 'root', 'password');

// check if connected ..
sequelize.authenticate().then(function(errors) { console.log(errors); });

sequelize.query('SELECT * FROM user_tbl').then(function (args) {
    var data = args[0];
    console.log(data);
});
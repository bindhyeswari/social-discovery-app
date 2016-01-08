/**
 * Created by administrator on 12/22/15.
 */

var Sequelize = require('sequelize');
var opts = {
    define: {
        freezeTableName: true
    }
}
var sequelize = new Sequelize('socialapp_schema', 'root', 'manali',opts,{ 'pool': false });

var log =function(inst){
    console.dir(inst.get())
}

sequelize.authenticate().then(function (errors) {
    console.log("Authenticated...");
}, function (errors) {
    console.log(errors);
});

var User = sequelize.define('User', {
    idUser: {type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    username: Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    birthday:Sequelize.DATE,
    gender:Sequelize.STRING
},{timestamps: false});


var Announcement=sequelize.define('Announcements', {
    idAnnouncements: {type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    description: Sequelize.STRING,
    currentLocId: Sequelize.INTEGER,
    date: Sequelize.DATE,
    sttime: Sequelize.DATE,
    edtime:Sequelize.DATE,
    userid: Sequelize.INTEGER,
    interestid: Sequelize.INTEGER,
    maxUserCount: Sequelize.INTEGER,
    poiId: Sequelize.INTEGER,
    MatchMandatory: Sequelize.BOOLEAN,
    status:Sequelize.STRING
},{timestamps: false});

var AnnouncementFilter=sequelize.define('AnnouncementsFilter',{
    idAnnouncementsFilter:{type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    gender:Sequelize.STRING,
    ageFrom:Sequelize.INTEGER,
    ageTo:Sequelize.INTEGER,
    announceId:Sequelize.INTEGER
},{timestamps:false});

var Master_POI=sequelize.define('Master_placeOfInterest',{
    idPlaceOfInterest:{type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    placeName:Sequelize.STRING,
    address:Sequelize.STRING
},{timestamps:false});

var Replies=sequelize.define('Replies',{
    idReplies:{type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    announcementId:Sequelize.INTEGER,
    RepliedUserId:Sequelize.INTEGER,
    replyTime:Sequelize.DATE,
    RSVPstatus:Sequelize.STRING,
    acceptenceStatus:Sequelize.STRING
},{timestamps:false});

/* Amy and Lie code --start */

var Master_interest = sequelize.define('Master_interest',{
    idMaster_interest:{
        type:Sequelize.INTEGER
    },
    description:{
        type:Sequelize.STRING
    }
});

var Master_placeOfInterest = sequelize.define('Master_placeOfInterest',{
    idPlaceOfInterest:{
        type:Sequelize.INTEGER
    },
    placeName:{
        type:Sequelize.STRING
    },
    address:{
        type:Sequelize.STRING
    }
});

var Master_Distance = sequelize.define('Master_Distance',{
    idMaster_Distance:{
        type:Sequelize.STRING
    },
    distance:{
        type:Sequelize.DOUBLE
    }
});

var LocationHistory = sequelize.define('locationHistory',{
    idaddressHistory:{
        type:Sequelize.INTEGER
    },
    address:{
        type:Sequelize.STRING
    },
    date:{
        type:Sequelize.DATE
    },
    userid:{
        type:Sequelize.INTEGER
    }
});

var placeOfInterestByUser = sequelize.define('placeOfInterestByUser',{
    id_user_poi:{
        type:Sequelize.INTEGER
    },
    userid:{
        type:Sequelize.INTEGER
    },
    poiId:{
        type:Sequelize.INTEGER
    }
})

var InterestByUser = sequelize.define('interestbyuser',{
    id_user_interest:{
        type:Sequelize.INTEGER
    },
    userid:{
        type:Sequelize.INTEGER
    },
    interestId:{
        type:Sequelize.INTEGER
    }
});

/* Amy and Lie code --end */

Master_POI.hasMany(Announcement,{foreignKey:'poiId'});
Announcement.belongsTo(Master_POI,{foreignKey:'poiId'});

AnnouncementFilter.belongsTo(Announcement,{foreignKey:'announceId'});

Replies.belongsTo(Announcement,{foreignKey:'announcementId'});

/*console.log('GET /user (Sign In)');
    User.findAll({where:{username:'manali' ,$and: {password:'manali'}}}).then(function(user) {
 // console.log("Success!",user);
    user.forEach(log);
})*/

/*console.log('POST /user (Sign Up)');
    User.create({
        idUser:9,
        username:'alok',
        email:"alok@gmail.com",
        password:"alok",
        birthday:"1989-02-17",
        gender:"male"
    }).then(function(user,created){
        console.log(user);
        console.log(created);
    });*/

/*console.log('# GET/announcements by distance');
Announcement.findAll().then(function(announcement) {
    console.log("Query Successful!");
    announcement.forEach(log);
})

console.log('# GET/announcements by time');
Announcement.findAll( {where:{sttime:{$gt:'2016-01-04 20:20:00'} ,$and: {edtime:{$lt:'2016-01-04 21:50:00'}}}}).then(function(announcement) {
    console.log("Query Successful!");
    announcement.forEach(log);
})

console.log('# GET/announcements by POI');
Announcement.findAll().then(function(announcement) {
    console.log("Query Successful!");
    announcement.forEach(log);
})

console.log('# GET/announcements by interest');
Announcement.findAll().then(function(announcement) {
    console.log("Query Successful!");
    announcement.forEach(log);
})

console.log('# GET/announcements by gender');
Announcement.findAll().then(function(announcement) {
    console.log("Query Successful!");
    announcement.forEach(log);
})


console.log('# GET/announcements by age limit');
Announcement.findAll().then(function(announcement) {
    console.log("Query Successful!");
    announcement.forEach(log);
})
*/


/*console.log('POST /announcements(Events)');
Announcement.create({
    idAnnouncements: 1,
    description: 'Lets go for movie',
    currentLocId: 1,
    date: "2016-01-04",
    sttime: "2016-01-04",
    edtime:"2016-01-04",
    userid: 1,
    interestid: 1,
    maxUserCount: 5,
    poiId: 1,
    MatchMandatory: true,
    status:'new'
}).then(function(announcement,created){
    console.log(announcement);
    console.log(created);
});*/

/*var Distance=sequelize.define('Master_Distance',{
    idMaster_Distance:{type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    distance:Sequelize.INTEGER
},{timestamps: false});

Distance.findAll().then(function(distance){
   console.log("finding distances...",distance);
});*/

/*console.log('GET /allinterests');
sequelize.query("Select * from Master_interest").then(function (args) {
    console.log("Result: ",args[0]);
});*/

/*console.log('GET /allpoi');
sequelize.query("Select * from Master_placeOfInterest").then(function (args) {
    console.log("Result: ",args[0]);
});*/

/* console.log('POST /selectinterest_poi');
 sequelize.query("insert into socialapp_schema.interest values('1','amy','amy@gmail.com','amy','1985-09-11','female');").then(function (args) {
 console.log("Result: ",args[0]);
 });*/



module.exports={
    User:User,
    Announcement:Announcement,
    Master_POI:Master_POI,
    AnnouncementFilter:AnnouncementFilter,
    Replies:Replies,
    /* Amy and Lie code --start */

    Master_interest:Master_interest,
    Master_placeOfInterest:Master_placeOfInterest,
    Master_Distance:Master_Distance,
    LocationHistory:LocationHistory,
    placeOfInterestByUser:placeOfInterestByUser,
    InterestByUser:InterestByUser
    /* Amy and Lie code --end */

}


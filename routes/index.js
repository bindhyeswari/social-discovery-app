var express = require('express');
var router = express.Router();
var schema=require("../dbschema");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Sign in */
router.get('/users', function(req, res, next) {
  var username = req.param('username');
  var password=req.param('password');
  schema.User.findAll({where:{username:username ,$and: {password:password}}}).then(function(result) {
    res.status(200).json(result);
  })
});

/* Sign up */
router.post('/users', function (req, res) {
/*  req.body.idUser=12;
  req.body.username="pqrs";
  req.body.email="pqrs@gmail.com";
  req.body.password="pqrs";
  req.body.birthday="1990-03-02";
  req.body.gender="male";*/

  schema.User.create(req.body).then(function () {
    res.status(200).json('Saved User');
  },function(){
    res.status(500).json({
      message: 'Could not save data ... '
    });
  });
});

/* Make announcement */
router.post('/announcements', function (req, res) {

  schema.Announcement.create({
    idAnnouncements: 7,
    description: 'watching movie',
    currentLocId: 1,
    date: "2016-09-09",
    sttime: "2016-09-09",
    edtime: "2016-09-09",
    userid: 2,
    interestid: 1,
    maxUserCount: 4,
    poiId: 2,
    MatchMandatory: false,
    status:'new'
  }).then(function(announcements) { // note the argument
    schema.AnnouncementFilter.create({
      idAnnouncementsFilter:2,
      gender:"male",
      ageFrom:30,
      ageTo:45
    }).then(function(announcementfilters) { // note the argument
      announcementfilters.setAnnouncement(announcements)
          .then(function(added) {
            console.log("Success!!!");
          });
    })
  });


});

/* Get Announcements by time */
/*router.get('/announcements', function(req, res, next) {
  var sttime = req.param('sttime');
  var edtime=req.param('edtime');
  schema.Announcement.findAll({where:{sttime:{$gt:sttime} ,$and: {edtime:{$lt:edtime}}}}).then(function(result) {
    res.status(200).json(result);
  })
});*/

/* Get Announcements by distance */
router.get('/announcementsByDistance',function(){
  console.log("getting annoucements by distance");
  schema.Announcement.findAll({
    include:[
        {model:schema.Master_POI}
    ]
  }).then(function(poi){
    console.log(JSON.stringify(poi))
  })
});

/* Get announcements by place of interest */
router.get('/announcementsByPOI',function(){
  console.log("getting annoucements by distance");
 schema.Master_POI.findAll({ where:{placeName:'AMC Mercado 20'},
    include:[
      {model:schema.Announcement}
    ]
  }).then(function(ann){
    console.log(JSON.stringify(ann))
  })
});

/* Get announcements by gender */
router.get('/announcementsByGender',function(){
  console.log("getting annoucements by gender");
  schema.AnnouncementFilter.findAll({where:{gender:'female'},
    include:[
      {model:schema.Announcement}
    ]
  }).then(function(anno){
    console.log(JSON.stringify(anno))
  })
});


/* Get announcements by ageFrom */
router.get('/announcementsByAgeFrom',function(){
  console.log("getting annoucements by ageFrom");
  schema.AnnouncementFilter.findAll({ where:{ageFrom:{$gt:20}},
    include:[
      {model:schema.Announcement}
    ]
  }).then(function(anno){
    console.log(JSON.stringify(anno))
  })
});

/* Get announcements by ageTo */
router.get('/announcementsByAgeTo',function(){
  console.log("getting annoucements by ageTo");
  schema.AnnouncementFilter.findAll({where:{ageTo:{$lt:46}},
    include:[
      {model:schema.Announcement}
    ]
  }).then(function(anno){
    console.log(JSON.stringify(anno))
  })
});

module.exports = router;

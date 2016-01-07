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
router.get('/announcements', function(req, res, next) {
  var sttime = req.param('sttime');
  var edtime=req.param('edtime');
  schema.Announcement.findAll({where:{sttime:{$gt:sttime} ,$and: {edtime:{$lt:edtime}}}}).then(function(result) {
    res.status(200).json(result);
  })
});

/* Get Announcements by distance */
router.get('/announcementsByDistance',function(){
  console.log("getting annoucements by distance");
  schema.Announcement.findAll({
    include:[
        {model:schema.Master_POI}
    ]
  }).then(function(poi){
    console.log(JSON.stringify(poi))
 //   var json = JSON.parse(poi);
  //  console.log(json);


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
  console.log("getting announcements by ageTo");
  schema.AnnouncementFilter.findAll({where:{ageTo:{$lt:46}},
    include:[
      {model:schema.Announcement}
    ]
  }).then(function(anno){
    console.log(JSON.stringify(anno))
  })
});

/* Get announcements by interest */

/* Get announcements by reply */
router.get('/announcementsByReply',function(){
  console.log("getting announcements by replies");
  schema.Replies.findAll({
    include: [
      {model: schema.Announcement}
    ]
  }).then(function(anno){
    console.log(JSON.stringify(anno))
  })
});

/* Delete announcement */
router.get('/deleteannouncements',function(){
  console.log("deleting announcements");
  schema.Announcement.destroy({
    where: {
      idAnnouncements: 4
    },
  })

});


/* Amy and Lay code --start */

router.post('/masterInterest',function(req,res){

  schema.Master_interest.create(req.body).then(function(){
    res.status(201).json({message:'create master interest successfully'});
  },function(){
    res.status(500);
  })
});

router.get('/masterinsterests',function(req,res){
  schema.Master_interest.findAll().then(function(result){
    res.status(200).json(result);
  })
});

router.post('/masterPlaceOfInterest',function(req,res){
  Master_placeOfInterest.create(req.body).then(function(){
    res.status(201).json({message:'create master place of interest successfully'});
  },function(){
    res.status(500);
  })
});

router.get('/masterplaceofinterest',function(req,res){
  Master_placeOfInterest.findAll().then(function(result){
    res.status(200).json(result);
  })
});

router.post('/placeinteresofuser',function(req,res){
  //{user:xxx,placeids:[placeid1, placeid2, placeid3]}
  req.body.placeids.forEach(function(placeid){
    placeOfInterestByUser.create({
      userid:req.body.user,
      poiId:placeid
    }).then(function(result){
      res.status(201).json({message:'successfully!',result:result});
    },function(error){
      res.status(500).json({message:'fail!',error:error});
    })
  })
});

router.post('/interesofuser',function(req,res){
  //{user:xxx,interestids:[interestid1, interestid2, interestid3]}
  req.body.interestids.forEach(function(interestid){
    InterestByUser.create({
      userid:req.body.user,
      poiId:interestid
    }).then(function(result){
      res.status(201).json({message:'successfully!',result:result});
    },function(error){
      res.status(500).json({message:'fail!',error:error});
    })
  })
});

router.get('/interesofuser',function(req,res){
  InterestByUser.findAll().then(function(result){
    res.status(200).json(result);
  })
})

router.post('/masterDistance',function(req,res){
  Master_Distance.create(req.body).then(function(){
    res.status(201).json({message:'create master distance successfully'});
  },function(){
    res.status(500);
  })
});

router.post('/locationHistory',function(req,res){
  LocationHistory.create(req.body).then(function(){
    res.status(201).json({message:'create history successfully'});
  },function(){
    res.status(500);
  })
});

/* Amy and Lay code --end */


module.exports = router;

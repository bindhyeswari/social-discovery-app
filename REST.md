#Restful End Points

All endpoints to be used are to be defined in the format - (apiaryblueprint)[https://github.com/apiaryio/api-blueprint#readme]]

 - Success Response Code
 - MIME type
 - Input Schema
 - Output Schema
 - Optional Description
    

# GET /user
 - ``` Response 200 ```
 - ``` application/json ```
 - Input: {
    username:'',
    password:''
 }
 - Output ``` [ {user} ] ``` 
 - Sign In(Authenticate User with username and password)
 
# POST /user
 - ``` Response 201 ```
 - ``` application/json ```
 - Input Body - ``` { user } ```
 - Output - ``` { user } ```
 - Sign Up

# GET/allinterests
 - ``` Response 200 ```
 - ``` application/json ```
 - Input: none
 - Output ``` [ {Master_interest} ] ```
 - List of all interests when user first logs into the App

# GET/allpoi
 - ``` Response 200 ```
 - ``` application/json ```
 - Input: none
 - Output ``` [ {Master_placeOfInterest} ] ```
 - List of all place of interests when user first logs into App

# POST /selectinterest_poi
 - ``` Response 201 ```
 - ``` application/json ```
 - Input Body - ``` {
                        userid:'',
                        interestid:'',
                        poiId:''
                } ```
 - Output - ``` { interest,placeOfInterest } ```
 - Add interests and places of interest selected by User

 # POST/current_location
 - ``` Response 201 ```
  - ``` application/json ```
  - Input Body - ``` {currentAddress} ```
  - Output - ``` { currentAddress } ```
  -Store Users current location when user logs in

# GET/announcements
 - ``` Response 200 ```
 - ``` application/json ```
 - Input: {currentAddId}
 - Output ``` [ {announcements} ] ```
 - List of all events sorted by distance

 # GET/announcements
  - ``` Response 200 ```
  - ``` application/json ```
  - Input: ```{
        sttime:'',
        edtime:''
  } ```
  - Output ``` [ {announcements} ] ```
  - List of all events sorted by time

 # GET/announcements
  - ``` Response 200 ```
  - ``` application/json ```
  - Input: ```{ poiId:'' } ```
  - Output ``` [ {announcements} ] ```
  - List of all events sorted by place of interest

 # GET/announcements
   - ``` Response 200 ```
   - ``` application/json ```
   - Input: ```{ interestid:'' } ```
   - Output ``` [ {announcements} ] ```
   - List of all events sorted by interest

  # GET/announcements
   - ``` Response 200 ```
   - ``` application/json ```
   - Input: ```{ gender:'' } ```
   - Output ``` [ {announcements} ] ```
   - List of all events sorted by gender

  # GET/announcements
   - ``` Response 200 ```
   - ``` application/json ```
   - Input: ```{ ageFrom:'',ageTo:'' } ```
   - Output ``` [ {announcements} ] ```
   - List of all events sorted by age limit

  # POST/makeannouncement
   - ``` Response 201 ```
   - ``` application/json ```
   - Input Body - ``` {Announcements,AnnouncementsFilter} ```
   - Output - ``` { Announcements,AnnouncementsFilter } ```
   - When User makes an announcement

  # GET/getannouncements
   - ``` Response 200 ```
   - ``` application/json ```
   - Input: ```{ currentAddId:'',interestId:'',poiId:'' } ```
   - Output ``` [ {Announcement} ] ```
   - When User gets an announcement nearby current location sharing same interest or place of interest

  # POST/reply
   - ``` Response 201 ```
   - ``` application/json ```
   - Input Body - ``` {Replies} ```
   - Output - ``` { Replies } ```
   - When User accepts an announcement

 # GET/reply
   - ``` Response 200 ```
   - ``` application/json ```
   - Input: ```{ announcementId} ```
   - Output ``` [ {Replies} ] ```
   -When Host of event gets replies by people who are interested in attending the event

  # POST/event
   - ``` Response 201 ```
   - ``` application/json ```
   - Input Body - ``` {events} ```
   - Output - ``` { events } ```
   - When Host of an event accepts user to allow him to attend the event


  # POST/locationHistory
   - ``` Response 201 ```
   - ``` application/json ```
   - Input Body - ``` {addressHistory} ```
   - Output - ``` { addressHistory } ```
   - Previous address gets stored when location gets updated



































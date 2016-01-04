#Restful End Points

All endpoints to be used are to be defined in the format - (apiaryblueprint)[https://github.com/apiaryio/api-blueprint#readme]]

 - Success Response Code
 - MIME type
 - Input Schema
 - Output Schema
 - Optional Description
    

# GET /users
 - ``` Response 200 ```
 - ``` application/json ```
 - Input: none
 - Output ``` [ {user} ] ``` 
 - List of all users paginated
 
# POST /users
 - ``` Response 201 ```
 - ``` application/json ```
 - Input Body - ``` { user } ```
 - Output - ``` { user } ```

# GET/allinterests
 - ``` Response 200 ```
 - ``` application/json ```
 - Input: none
 - Output ``` [ {interest} ] ```
 - List of all interests









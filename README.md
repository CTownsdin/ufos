# ufos

GET all ufos - needs pagination.
http://127.0.0.1:8080/v1/ufos

GET ufos by city
http://127.0.0.1:8080/v1/ufos?city=Louisville

GET ufos by time
http://127.0.0.1:8080/v1/ufos?date=2016-11-28T00:00:00-08:00

SwaggerDoc - Just Started...
http://127.0.0.1:8080/v1/api-docs/

I experimented with deployment on elastic beanstalk, the connection to the dynamoDB is not working correct there yet unfortunately.

Run dynamoDB locally with Java Jar:   https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html. 
Use the create-dynamo-table.js and populate-dynamo-table.js files to set up the dev database.  
  
Happy to walk through the code with anyone and talk about it. Thanks!  

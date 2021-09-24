# <img src="https://user-images.githubusercontent.com/59449120/134697208-bd0f8826-1173-40be-9386-5ba114375de6.png" width="48"> AssessmentBuilder
It is a final year project created using the MERN stack. The web application allows the users ( lecturers ) to create and conduct assessments online, for ( students ), they are able to attempt the assessments online.

## Run
```npm
npm install
npm run client
npm run server
npm run dev
```
## Host
This app is hosted on [heroku](https://dashboard.heroku.com/apps/assessmentbuilder).
Click [here](https://assessmentbuilder.herokuapp.com/) to access assessmentbuilder app.

## Email
assessmentbuilder2020@gmail.com

## Features
- Provide question bank to store and create questions
- As many as 6 question templates
  - Single choice
  - Multiple choice
  - Descriptive
  - True or false
  - Short answer
  - Order
- View results of each candidates, their choice of answer
- Email results
- Statistics on whole assessments and all questions
- Reuse assessment
- Mark descriptive questions
- Dynamic question order
- Dynamic set generation settings
- Flexible timer
- cheating check mechanism
- generate QR code for the assessment

## Picture
<img src="https://user-images.githubusercontent.com/59449120/134696101-d833e89c-c98a-4c31-b84c-28da4888e6ab.png" width="700">

## Third party usage
[Cloudinary](https://cloudinary.com/) stores images  
[Sendgrid](https://sendgrid.com/) helps in sending single to multiple emails at once  
[MongoDB](https://www.mongodb.com/) stores data  

## .env (place it with client and server)
DB="mongodb+srv://clifford:j4UAR7PbgKWd8uIy@assessmentbuilder.nqpou.mongodb.net/AssessmentBuilder?retryWrites=true&w=majority"
JWT_TOKEN_KEY="asbdiqwneiuqenqwne123123i192hsndandnasdjsa"
JWT_TOKEN_KEY_CAND="aasdasdadsdfsbvcucuioqwrgjksrhgu"
SENDGRID_API_KEY="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"
CLIENT_URL=http://localhost:3000
EMAIL_FROM=assessmentbuilder2020@gmail.com
JWT_RESET_PASSWORD="fsudfnwrhusacjasdhasifdweoidiasuicbasi"
CLOUDINARY_NAME="dityuyf5q"
CLOUDINARY_API_KEY="146635135626323"
CLOUDINARY_API_SECRET="rjyvq6Xp4IKvdaDm5QHxXtfk-a8"

# Back-end for url-shortner

The app is live at: https://mudit-51-url-shortner.netlify.app/  

This is the backend for url-shortner (https://github.com/mudit-51/url-shortner)  

The full working of this back-end in integration with the front-end as well as the database is explained in the readme of the above repo. 

## Dependencies
* Express.js
* Node.js (>=0.6)
* Dotenv
* CORS for express
* MongoDB

## Running Locally

1. Clone the project
2. Install the dependencies using `npm install` (npm is recommended)
3. Make a `.env` file in the root directory of the project following the template as given in the `.example.env` file. Change the `WEBURL` to wherever your front-end is hosted. Change the `MONGOURL` to access your personal database on MongoDB. 
4. Run using `npm start`. By default the application runs on **port 8080**. This can be changed in the `index.js` file. Simply change the value of `port` variable on line 8


## Miscellaneous
* This back-end is currently hosted on **Google Cloud** using **Google App Engine**.

readme wip
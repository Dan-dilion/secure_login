# **<u>JWT Secure Login System</u>**
a demonstration of server-side authentication

### [Click Here](http://www.waxworlds.org/dan/secure_login/) to see the project

Hello,
This project was created with Create React App using the Redux and Redux Toolkit
template.

Aside from the packages installed by Create React App below is a summary of NPM
packages that I have used:
  - Material-UI
  - bcryptjs
  - owasp-password-strength-test
  - date-io
  - react-spinners
  - notistack
  - express
  - jasonwebtoken
  - mysql
  - cors

# To download and run this project: [^1]
  1. Clone master branch of GitHub repository to local folder
  2. To set up your database and generate a dbconfig.json file navigate to the
     the server directory in your terminal and run the script setupserver.sh,
     Follow the on-screen instructions
  3. Back in the projects root directory use Node Package Manager to install
     all dependencies, type the following:
    `npm install`
  4. To run the project enter:
    `npm run start`

The project should open up automatically in your default browser

# To deploy to web server: [^2]
  1. Follow the above instructions to install the project
  2. If you intend to deploy to a subdirectory on your web server edit file
  	  `/package.json` and change the `homepage` value (the first entry)
     to the subdirectory that you are deploying to. For example if you are
     deploying to http://yourServer.com/subdirectory/secure_login/
     change the `homepage` value to `/subdirectory/secure_login`
  3. Run the following command:
     `npm run build`
  4. Copy the contents of the newly created `/build` directory to the
     deployment directory on your server
  5. Now copy the contents of `/server` over to your web server (you can rename it if you like) [^3]
  6. Finally in the `server` directory run the bash script `setupserver.sh` and follow the
     instructions. Running the `setupserver.sh` script will perform the following actions:
     - Ask you for your database config details (username, password, database name etc)
     - Generate a dbconfig.json file
     - Offer to create a new database
     - Offer to create a new users table in the database
     - Offer to install the servers dependancies (runs `npm install`)
     - Offer to start the server (runs `node mainServer.js`)

[^1]: To run this project you will need to be running a [MySQL server](https://dev.mysql.com/downloads/mysql/)
[^2]: To deploy this project you will need shell access to a web server that has a MySQL server running and NodeJS installed
[^3]: It's bad practise to have the server directory inside the hosting directory although there is a `.htaccess` file in the server directory that will prevent access to your database login details it is still strongly recommended not to do this!

#!/bin/bash

#####################
#  Configure Mysql  #
# by Daniel Marston #
#####################

echo
echo "##################################################"
echo "#                                                #"
echo "#  Welcome to the secure login DB setup wizard   #"
echo "#                                                #"
echo "##################################################"
echo
echo "This batch file will gather the necessary details from you to set up the"
echo "secure login database."
echo "I appreciate your concerns, should you have them, about running unknown"
echo "shell scripts acquired from the internet and I would strongly recommend"
echo "that you have a good look though it before you run it."
echo "That being said, I assure you there is nothing nefarious in this script,"
echo "it will create a file called dbconfig.json with the info you supply and"
echo "then give you the option of creating the database you name and/or"
echo "creating the secure login users table."
echo "If your database is being used by multiple applications I would recommend"
echo "adding a prefix to the table name."
echo
echo "Lets begin..."
echo
if [ -e "./dbconfig.JSON" ]
then
  echo
  echo "dbconfig.json already exists, please delete it and try again"
  echo
  exit 1
else
echo "Please enter the user name for your MySql server: "
  read user
  echo
  echo "Please enter the password: "
  read password
  echo
  echo "Please enter the name of the database: "
  read database
  echo
  echo "please enter any prefix you may want (for databases used by muliple applications)"
  read prefix
  echo
  echo
  echo "Thank you, generating dbconfig.json now..."
  touch ./dbconfig.json
  echo "{
  \"host\": \"localhost\",
  \"user\": \"$user\",
  \"password\": \"$password\",
  \"database\": \"$database\",
  \"prefix\": \"$prefix\"
}" > ./dbconfig.json

  echo "dbconfig.json successfully created."
  echo
  echo "would you like to create the database ($database) now (y/n)?"
  read answer
  if [ $answer == 'y' ]
  then
    echo
    echo "Running the following query now..."
    echo "CREATE DATABASE IF NOT EXISTS ${database};"
    mysql -u$user -p$password -e "CREATE DATABASE IF NOT EXISTS ${database};"
    echo
    if [ $? -gt 0 ]
    then
      echo "Appologies, something went wrong! Please contact your IT technician"
      exit 1
    fi
  fi

  echo
  echo "Would you like to create the table ${prefix}users now (y/n)? "
  read answer
  if [ $answer == 'y' ]
  then
    echo "Running the following query now..."
    echo "CREATE TABLE ${prefix}users (id int NOT NULL AUTO_INCREMENT,
datecreated datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
datelastlogin datetime DEFAULT NULL,
username varchar(45) NOT NULL,
email varchar(256) NOT NULL,
password varchar(256) NOT NULL,
phone varchar(15) DEFAULT NULL,
address varchar(256) DEFAULT NULL,
dob date DEFAULT NULL,
gender varchar(20) DEFAULT NULL,
PRIMARY KEY (id),
UNIQUE KEY id_UNIQUE (id) )
ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci;"

    mysql -u$user -D $database -p$password <<EOF

CREATE TABLE ${prefix}users (id int NOT NULL AUTO_INCREMENT,
datecreated datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
datelastlogin datetime DEFAULT NULL,
username varchar(45) NOT NULL,
email varchar(256) NOT NULL,
password varchar(256) NOT NULL,
phone varchar(15) DEFAULT NULL,
address varchar(256) DEFAULT NULL,
dob date DEFAULT NULL,
gender varchar(20) DEFAULT NULL,
PRIMARY KEY (id),
UNIQUE KEY id_UNIQUE (id) )
ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

EOF

    if [ $? -gt 0 ]
    then
      echo "something went wrong while trying to create the table ${database}.${prefix}users!"
      echo "Please contact your IT technician"
      exit 1
    fi
  fi
  echo
  echo "Would you like to download and install server dependancies now?"
  echo "(alternatively you can run 'npm install' from the /server/ folder)"
  read answer
  if [ $answer == 'y' ]
  then
    npm i
  fi
  echo
  echo "All done!"
  echo
  echo "would you like to run the server now?"
  echo "(alternatively you can run 'node mainServer.js' from the /server/ folder)"
  read answer
  if [ $answer == 'y' ]
  then
    node ./mainServer.js
  fi
  echo
  exit 0
fi

#!/bin/bash

#####################
#  Configure Mysql  #
# by Daniel Marston #
#####################

echo
echo "Welcome to the secure login DB setup wizzard"
if [ -e "./dbconfig.JSON" ]
then
  echo
  echo "dbconfig.json already exists, please delete it and try again"
  echo
  exit 1
else
echo "Please enter the user name for your MySql server: "
  echo
  read user
  echo
  echo "Please enter the password: "
  echo
  read password
  echo
  echo "Please enter the name of the database: "
  echo
  read database
  echo
  echo "please enter any prefix you may want (for databases used by muliple applications)"
  echo
  read prefix
  echo
  echo
  echo "Thank you, generating dbconfig.js now..."
  touch ./dbconfig.json
  echo "{
  \"host\": \"localhost\",
  \"user\": \"$user\",
  \"password\": \"$password\",
  \"database\": \"$database\",
  \"prefix\": \"$prefix\"
}" > ./dbconfig.JSON

  echo
  echo "dbconfig.json successfully created."
  echo "would you like to create the database ($database) now (y/n)?"
  read answer
  if [ answer = 'y' ]
  then
    mysql -u$user -p$password -e "CREATE DATABASE IF NOT EXISTS $database"
    echo
    if [$? > 0]
    then
      echo "something went wrong, perhaps the database already exists!"
    fi
  fi

  echo
  echo "Would you like to create the table ${prefix}users now (y/n)? "
  read answer
  if [ answer = 'y' ]
  then
    mysql -u$user -p$password -e "USE ${database}; CREATE TABLE `${prefix}users` (
`id` int NOT NULL AUTO_INCREMENT,
`datecreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`datelastlogin` datetime DEFAULT NULL,
`username` varchar(45) NOT NULL,
`email` varchar(256) NOT NULL,
`password` varchar(256) NOT NULL,
`phone` varchar(15) DEFAULT NULL,
`address` varchar(256) DEFAULT NULL,
`dob` date DEFAULT NULL,
`gender` varchar(20) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
    if [$? > 0]
    then
      echo "something went wrong while trying to create the table ${database}.${prefix}users!"
    fi
  fi
  echo
  echo "All done!"
  echo

  exit 0
fi

import React from 'react';
import { Container, Card, Typography, List, ListItem } from '@material-ui/core';

import AboutLogic from './AboutLogic.js';

const ListItemLink = (props) => {
  const { classes } = AboutLogic(props);
  return <ListItem
    className={classes.listItem}
    button={true}
    component="a"
    divider={true}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />;
};

const About = (props) => {
  // De-structure logic
  const {
    classes,
    isSmall
  } = AboutLogic(props);

  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant={isSmall ? 'h2' : 'h1'}>About</Typography>
      <Container className={classes.textArea}>
        <Typography className={`${classes.paragraphs} ${classes.warning}`}>{`
          This site is for demonstration purposes only. Please do not enter any
          valuable data - you do not need a real email address to
          sign up.
        `}</Typography>
        <Typography className={classes.paragraphs}>{`
          JWT Secure Login System features a sophisticated server side form
          validation system for registering new users, ensuring that no
          inappropriate data makes its way into the database.
        `}</Typography>

        <Typography className={classes.paragraphs}>{`
          The cryptographic password storage mechanism transfers login details
          to the server with base64 encoded Basic Access Authorisation headers,
          which are then salted and hashed before being stored in the database.
          This ensures that the password cannot be retrieved by anyone, only
          verified and confirmed a match with future login attempts. Once the
          password is stored in this way not even the user will be able to
          retrieve it in its unencrypted form. If the password is forgotten it
          must be deleted and replaced.
        `}</Typography>

        <Typography className={classes.paragraphs}>{`
          The JSON web token is encrypted with the HS512 encryption
          algorithm, which can only be verified by the server, ensuring that
          the client session is always the same session that logged in.
          The token is set to expire after one minute.
        `}</Typography>

        <Typography className={classes.paragraphs}>{`
          This demo uses the following libraries:
        `}</Typography>

        <div className={classes.listBox}>
          <div className={classes.listBoxes}>
            <Typography variant={isSmall ? 'h4' : 'h3'}>Client-side</Typography>
            <List className={classes.lists} component="nav">
              <ListItemLink href="https://create-react-app.dev/" divider={true}>
                <Typography className={classes.listItem}>
                  Create React App
                </Typography>
              </ListItemLink>

              <ListItemLink href="https://reactjs.org/" divider={true}>
                <Typography className={classes.listItem}>
                  React
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/@reduxjs/toolkit"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  Redux Toolkit
                </Typography>
              </ListItemLink>

              <ListItemLink href="https://mui.com/" divider={true}>
                <Typography className={classes.listItem}>
                  Material-UI
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/notistack"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  Notistack
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/react-spinners"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  React-Spinners
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/search?q=date-io"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  Date-io
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/bcryptjs"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  Bcryptjs
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/owasp-password-strength-test"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  OWASP-Password-Strength-Test
                </Typography>
              </ListItemLink>
            </List>
          </div>

          <div className={classes.listBoxes}>
            <Typography variant={isSmall ? 'h4' : 'h3'}>Server-side</Typography>
            <List className={classes.lists} component="nav">
              <ListItemLink href="https://www.npmjs.com/package/express" divider={true}>
                <Typography className={classes.listItem}>
                  express
                </Typography>
              </ListItemLink>

              <ListItemLink href="https://www.npmjs.com/package/jsonwebtoken" divider={true}>
                <Typography className={classes.listItem}>
                  jsonwebtoken
                </Typography>
              </ListItemLink>

              <ListItemLink href="https://www.npmjs.com/package/mysql" divider={true}>
                <Typography className={classes.listItem}>
                  mysql
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/bcryptjs"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  bcryptjs
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/owasp-password-strength-test"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  owasp-password-strength-test
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/cors"
                divider={true}
              >
                <Typography className={classes.listItem}>
                  cors
                </Typography>
              </ListItemLink>
            </List>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default About;

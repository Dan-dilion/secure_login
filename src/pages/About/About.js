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
    classes
  } = AboutLogic(props);

  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant="h1">About</Typography>
      <Container className={classes.textArea}>
        <Typography className={classes.paragraphs}>
          This site is for demonstration purposes only. It has a minimal
          front-end design and implements a Json Web Token exchange security
          system.
        </Typography>
        <Typography className={classes.paragraphs}>
          When the user logs in the server generates a unique token with which
          the client must use for further transactions with the server.
        </Typography>
        <Typography className={classes.paragraphs}>
          When access to the private page is requested the server is contacted
          and asked to verify the current session/token. If the token is invalid
          or has expired then access is denied.
        </Typography>
        <Typography className={classes.paragraphs}>
          While it would be fairly remedial for a hacker to access the style and
          layout of the private page the table of user data is not accessible
          without a valid Json Web Token.
        </Typography>
        <Typography className={classes.paragraphs}>
          This demo uses the following libraries:
        </Typography>

        <div className={classes.listBox}>
          <div className={classes.listBoxes}>
            <Typography variant="h3">Client-side</Typography>
            <List className={classes.lists} component="nav">
              <ListItemLink href="https://create-react-app.dev/" divider={true}>
                <Typography className={classes.text} variant="h5">
                  Create-React-App
                </Typography>
              </ListItemLink>

              <ListItemLink href="https://reactjs.org/" divider={true}>
                <Typography className={classes.text} variant="h5">
                  React
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/@reduxjs/toolkit"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
                  Redux Toolkit
                </Typography>
              </ListItemLink>

              <ListItemLink href="https://mui.com/" divider={true}>
                <Typography className={classes.text} variant="h5">
                  Material-UI
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/notistack"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
                  notistack
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/react-spinners"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
                  react-spinners
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/search?q=date-io"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
                  date-io
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/bcryptjs"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
                  bcryptjs
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/owasp-password-strength-test"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
                  owasp-password-strength-test
                </Typography>
              </ListItemLink>
            </List>
          </div>

          <div className={classes.listBoxes}>
            <Typography variant="h3">Server-side</Typography>
            <List className={classes.lists} component="nav">
              <ListItemLink href="https://www.npmjs.com/package/express" divider={true}>
                <Typography className={classes.text} variant="h5">
                  express
                </Typography>
              </ListItemLink>

              <ListItemLink href="https://www.npmjs.com/package/jsonwebtoken" divider={true}>
                <Typography className={classes.text} variant="h5">
                  jsonwebtoken
                </Typography>
              </ListItemLink>

              <ListItemLink href="https://www.npmjs.com/package/mysql" divider={true}>
                <Typography className={classes.text} variant="h5">
                  mysql
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/bcryptjs"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
                  bcryptjs
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/owasp-password-strength-test"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
                  owasp-password-strength-test
                </Typography>
              </ListItemLink>

              <ListItemLink
                href="https://www.npmjs.com/package/cors"
                divider={true}
              >
                <Typography className={classes.text} variant="h5">
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

import React from 'react';
import { Container, Typography } from '@material-ui/core';

import diagram from './assets/jwt_diagram.png';
import HomeLogic from './HomeLogic.js';

const Home = (props) => {
  // De-structure logic
  const {
    classes,
    isSmall
  } = HomeLogic(props);

  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant={isSmall ? 'h2' : 'h1'}>Welcome</Typography>
      <Container>
        <Typography className={classes.paragraphs}>
          Download the source code for JWT Secure Login System <a href="">here</a>.
          There you will also find deployment instructions.
        </Typography>
        <Typography className={classes.paragraphs}>
          The project comes bundled with a bash script to set up your database.
        </Typography>

        <div className={classes.textAndDiagramContainer}>
          <div className={classes.textArea}>
            <Typography className={classes.paragraphs}>{`
              This demo has a minimal front-end design and implements a JSON Web
              Token security system.
            `}</Typography>
            <Typography className={classes.paragraphs}>{`
              When the user logs in, the server generates a unique token, which
              the client must use for further transactions with the server.
            `}</Typography>
            <Typography className={classes.paragraphs}>{`
              When access to the private page is requested, the server is contacted
              and asked to verify the current session/token. If the token is invalid
              or has expired then access is denied and requests to the database are
              restricted.
            `}</Typography>
            <Typography className={classes.paragraphs}>{`
              While it would be remedial for a hacker to access the style and layout
              of the private page, the table of user data is not accessible without a
              valid JSON Web Token.
            `}</Typography>
          </div>

          <div className={classes.diagramBox}>
            <img className={classes.diagram} src={diagram} alt="jwt_diagram" />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Home;

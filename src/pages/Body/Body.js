import React from 'react';
import PropTypes from 'prop-types';

import BodyLogic from './BodyLogic.js';
import { RenderTable } from '../../globalComponents/RenderTable/RenderTable.js';

import './Body.css';

export const Body = props => {
  // Destructure logic
  const {
    sqlResults,
    pressMeButton
  } = BodyLogic(props);

  return (
    <div className="results_wrapper">
      <div className="press_me_wrapper">
        <button onClick={pressMeButton}>Press Me</button>
      </div>
      <div>
        <center>
          <label style={{ color: 'black' }}>JWT: - </label>
          <input
            className="jwt"
            type="text"
            value={ props.jwt }
            disabled
          />
        </center>
      </div>
      <div className="table_wrapper">
        <h3>Results: </h3>
        <div className="results">
          { RenderTable(props.sqlResults) }
        </div>
      </div>
    </div>
  );
};

Body.propTypes = {
  sqlResults: PropTypes.array,
  jwt: PropTypes.string
};

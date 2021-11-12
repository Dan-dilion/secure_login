import React from 'react';

import './RenderTable.css';

export const RenderTable = (data) => {
  let headerItems = [];
  if (data.length) {
    headerItems = Object.keys(data[0]);
    console.log(data);
    console.log('Headers: ', headerItems);
  }

  const styles = {
    id: { width: '3rem', marginLeft: '2rem', overflow: 'scroll', scrollbarWidth: 'none' },
    username: { width: '10rem', marginLeft: '2rem', overflow: 'scroll', scrollbarWidth: 'none' },
    password: { width: '10rem', marginLeft: '2rem', overflow: 'scroll', scrollbarWidth: 'none' },
    email: { width: '25rem', marginLeft: '2rem', overflow: 'scroll', scrollbarWidth: 'none' }
  };

  return (
    <table className='usersTable'>
      <thead>
        <tr>
          {
            headerItems.map((header, i) => (
              <td key={JSON.stringify(i + data.length)}><div style={styles[header]}>{header}</div></td>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map((row, i) => (
            <tr key={JSON.stringify(i)}>
              {
                headerItems.map((header, j) => (
                  <td key={JSON.stringify(i) + JSON.stringify(j)}>
                    <div style={styles[header]}>{row[header]}</div>
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

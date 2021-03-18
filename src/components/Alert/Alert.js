import React from 'react';
import './Alert.scss';

const Alert = () => {
  return (
    <div className="Alert">
      {/* <span className="Alert__close-btn">&times;</span> */}
      <strong>Warning!</strong> Contact is already exists!
    </div>
  );
};

export default Alert;

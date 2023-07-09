import React from 'react';
import alertImage from './alert-image.png';

const PackageInstaller = () => {

    const handleSubmit = (event) => {
       
        console.log('test');
    
        
    
      };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={alertImage}
        alt="Alert Sign"
        style={{ width: '200px' }}
      />
      <p>
        You should install the following package on your org : 
        <span>  </span>
        <span style={{ textDecoration: 'underline' }} onClick={handleSubmit}>InnovaScrum</span>

      </p>
    </div>
  );
};

export default PackageInstaller;
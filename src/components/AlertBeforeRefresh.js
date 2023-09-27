import React, { useEffect } from 'react';

function AlertBeforeRefresh() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Your data will be lost'; // This text will be displayed in the confirmation dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <div></div>;
}

export default AlertBeforeRefresh;

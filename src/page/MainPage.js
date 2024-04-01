import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SegmentPopup from "../components/SegmentPopup/segmentPopup";

const MainPage=()=>{
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => setShowPopup(false);
  const handleShowPopup = () => setShowPopup(true);

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShowPopup}>
        Save segment
      </Button>
      <SegmentPopup show={showPopup} handleClose={handleClosePopup} />
    </div>
  );
}

export default MainPage;

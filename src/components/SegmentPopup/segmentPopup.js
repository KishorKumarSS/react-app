import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';

const SegmentPopup = ({ show, handleClose }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [addedSchemas, setAddedSchemas] = useState([]);

  const handleAddSchema = () => {
    if (selectedSchema) {
      setAddedSchemas([...addedSchemas, selectedSchema]);
      setSelectedSchema('');
    }
  };

  const handleSaveSegment = async () => {
    try {
      // Format data to send
      const dataToSend = {
        segmentName,
        addedSchemas
      };
  
      // Make POST request to webhook URL
      const response = await fetch('https://webhook.site/b794fa60-a2a4-44a5-8a7d-f14e57d07b14', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
  
      // Check if request was successful
      if (response.ok) {
        console.log('Data sent successfully!');
        handleClose(); // Close modal if data was sent successfully
      } else {
        console.error('Failed to send data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  const handleSegName = (e) => {
    e.preventDefault();
    setSegmentName(e.target.value)
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Save Segment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="segmentName">
          <Form.Label>Segment Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter segment name"
            value={segmentName}
            onChange={(e) => handleSegName(e)}
          />
        </Form.Group>
        <Form.Group controlId="addSchema">
          <Form.Label>Add schema to segment</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="schemaDropdown">
              {selectedSchema ? selectedSchema.label : 'Select Schema'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {schemas.map((schema) => (
                <Dropdown.Item
                  key={schema.value}
                  onClick={() => setSelectedSchema(schema)}
                >
                  {schema.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="secondary" onClick={handleAddSchema}>
            + Add new schema
          </Button>
        </Form.Group>
        <div className="blue-box">
          {addedSchemas.map((schema, index) => (
            <Dropdown key={index}>
              <Dropdown.Toggle variant="primary">
                {schema.label}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {schemas
                  .filter((item) => !addedSchemas.find((s) => s.value === item.value))
                  .map((item) => (
                    <Dropdown.Item
                      key={item.value}
                      onClick={() => {
                        setAddedSchemas([...addedSchemas.slice(0, index), item, ...addedSchemas.slice(index + 1)]);
                      }}
                    >
                      {item.label}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveSegment}>
          Save Segment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const schemas = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

export default SegmentPopup;

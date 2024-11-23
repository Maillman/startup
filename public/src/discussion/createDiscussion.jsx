import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function CreateDiscussion(props) {
    function storeDiscussion() {
        // Send the new discussion to the backend to be stored in the database
        
        // Close the modal
        props.onHide();
    }
    return (
        <Modal {...props} show={props.show} centered>
        <Modal.Header closeButton>
            <Modal.Title>Create a discussion:</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                <input id="discTitle" style={{ fontSize: '30px', fontWeight: 'bold' }} type="text" placeholder="Enter a Title" />
                <textarea id="discBody" style={{ marginTop: '10px' }} rows='6' cols='40' placeholder='Say Something'></textarea>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
            <Button variant="primary" onClick={storeDiscussion}>Create Discussion</Button>
            </Modal.Footer>
        </Modal>
    );
}
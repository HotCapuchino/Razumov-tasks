import React from 'react';
import {Modal} from 'react-bootstrap';
import ModalHOC from './ModalHOC';
import modalStyles from './Modal.module.scss';

function MyModal(props) {
    console.log(props);
    return (
        <Modal show={props.visible}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton onClick={props.close}>
                <Modal.Title>
                    {props.type}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => props.accept(props.type)}>
                    {/* {props.type.charAt(0).toUpperCase() + props.type.slice(1)} */}
                </button>
                <button onClick={props.close}>Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalHOC(MyModal);

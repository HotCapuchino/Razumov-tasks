import React from 'react';
import {Modal} from 'react-bootstrap';
import ModalHOC from './ModalHOC';
import modalStyles from './Modal.module.scss';

function MyModal(props) {
    return (
        <Modal show={props.visible}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton onClick={props.close}>
                <Modal.Title className={modalStyles.modalTitle}>
                    {props.type.charAt(0).toUpperCase() + props.type.slice(1)} ToDo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <div className={modalStyles.buttonsBlock}>
                    <button onClick={() => props.accept(props.type)} className={modalStyles.buttonsBlock__accept}>
                        {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
                    </button>
                    <button onClick={props.close} className={modalStyles.buttonsBlock__close}>Close</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalHOC(MyModal);

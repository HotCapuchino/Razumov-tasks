import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Modal } from 'react-bootstrap';
import warningModalStyles from './WarningModal.module.scss';

const mountOn = document.getElementById('modal-root');

export class WarningModal extends Component {

    constructor(props) {
        super(props);
        this.elem = document.createElement('div');
        this.state = {
            visible: false,
            message: ''
        };
    }

    componentDidMount() {
        mountOn.appendChild(this.elem);
        window.addEventListener('warning', (event) => {
            console.log(event.detail.message);
            this.setState(() => ({ visible: true, message: event.detail.message }),
                () => {
                    setTimeout(() => {
                        this.setState({ visible: false, message: '' });
                    }, 5000)
                }
            );
        });
    }

    componentWillUnmount() {
        mountOn.removeChild(this.elem);
    }

    handleCloseModal() {
        this.setState({ visible: false, message: '' });
    }

    renderElem() {
        return (
            <Modal show={this.state.visible}
                size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={this.handleCloseModal.bind(this)}>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{this.state.message}</div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.handleCloseModal.bind(this)}>Close</button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        return ReactDom.createPortal(<>{this.renderElem()}</>, this.elem);
    }
}

export default WarningModal;

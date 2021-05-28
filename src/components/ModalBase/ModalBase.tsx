import React from 'react'; 

import { IModalProps } from '../../interfaces/ModalProps';

import './styles.css';

const ModalBase: React.FC<IModalProps> = props => {
    const renderModal = () => (
        <div id="modalContainer" className="container-fluid">
            <div className="row">
                <div className="col-10 offset-1 col-md-6 offset-md-3" id="modalContainer__menu">
                    <div className="closeContainer">
                        <i className="fas fa-times fa-2x" onClick={props.onClose}></i>
                    </div>
                    <div className="titleContainer">
                        <h2>{props.modalTitle}</h2>
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )

    return props.isActive ? renderModal() : <></>
}

export default ModalBase;
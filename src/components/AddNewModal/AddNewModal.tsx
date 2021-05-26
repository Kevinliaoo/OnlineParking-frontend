import React from 'react'; 

import { IModalProps } from '../../interfaces/ModalProps';

import './styles.css';

const AddNewModal: React.FC<IModalProps> = props => {
    const { isActive } = props;

    const renderModal = () => (
        <div id="addNewModal" className="container-fluid">
            <div className="row">
                <div className="col-10 offset-1 col-md-6 offset-md-3" id="addNewModal__menu">
                    <div className="closeContainer">
                        <i className="fas fa-times fa-2x" onClick={() => props.onClose(false)}></i>
                    </div>
                    <div className="titleContainer">
                        <h2>Add new Parking:</h2>
                    </div>
                    <div id="addNewModal__form">
                        <input placeholder="Street name: " />
                        <input placeholder="Street number: " type="number" />
                        <input placeholder="Longitude: " type="number" />
                        <input placeholder="Latitude: " type="number" />
                        <button type="button" >Create</button>
                    </div>
                </div>
            </div>
        </div>
    )

    return isActive ? renderModal() : <></>
}

export default AddNewModal;
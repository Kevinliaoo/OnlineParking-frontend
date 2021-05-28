import React from 'react'; 

import ModalBase from '../ModalBase/ModalBase';
import Parking from '../../objects/Parking';
import { IOtherModals } from '../../interfaces/ModalProps';

interface IParkingModal extends IOtherModals {
    parkingData: Parking; 
}

const ParkingModal: React.FC<IParkingModal> = props => {
    const renderModal = () => (
        <div>Datos del parquimetro</div>
    )

    return (
        <ModalBase
            isActive={props.isActive}
            onClose={props.onClose}
            modalTitle="Parking info:"
        >
            {renderModal()}
        </ModalBase>
    )
}

export default ParkingModal;
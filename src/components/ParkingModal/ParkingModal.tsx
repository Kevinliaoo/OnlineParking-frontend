import React from 'react'; 

import ModalBase from '../ModalBase/ModalBase';
import IParkings from '../../interfaces/IParkings';
import { IOtherModals } from '../../interfaces/ModalProps';

interface IParkingModal extends IOtherModals {
    parkingData: IParkings; 
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
import React from 'react'; 

import IParkings from '../../interfaces/IParkings';
import { IModalProps } from '../../interfaces/ModalProps';

interface IParkingModal extends IModalProps {
    parkingData: IParkings
}

const ParkingModal: React.FC<IParkingModal> = props => {
    const renderModal = () => (
        <div></div>
    )

    return props.isActive ? renderModal() : <></>
}

export default ParkingModal;
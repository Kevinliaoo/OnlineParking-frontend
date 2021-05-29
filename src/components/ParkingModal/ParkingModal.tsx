import React from 'react'; 
import axios from 'axios';

import ModalBase from '../ModalBase/ModalBase';
import Parking from '../../objects/Parking';
import User from '../../objects/User';
import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';
import { IOtherModals } from '../../interfaces/ModalProps';

import './styles.css';

interface IParkingModal extends IOtherModals {
    parkingData: Parking; 
    reRenderMap: () => void;
    user: User;
}

const ParkingModal: React.FC<IParkingModal> = props => {

    const configs = {
        headers: { Authorization: `Bearer ${LSFunctions.getJwtToken()}` }
    };

    const { parkingData: parking } = props;

    const [ counts, setCounts ] = React.useState<number>(0);

    const occupyParking = () => {
        const endpoint = `${config.API.URL}/users/parking/${parking._id}`; 
        const endpoint2 = `${config.API.URL}/parkings/${parking._id}`;

        axios.put(endpoint, {}, configs) 
            .then(() => {
                setCounts(counts+1);
                axios.put(endpoint2, {}, configs)
                    .then(() => {
                        props.reRenderMap();
                        props.onClose();
                    })
                    .catch(e => {
                        alert('Internal server error');
                    })
            })
            .catch(e => {
                alert('Internal server error'); 
                props.onClose();
            })
    }

    const renderModal = () => (
        <div className="container">
            <div className="row">
                <div className="col-12 streetName">
                    <p>{parking.city} city, {parking.address.streetName} {parking.address.number}</p>
                </div>
                <div className="col-12 parkingData">
                    <p>Counts: {parking.counts}</p>
                    <p>Last occupued: {parking.last_updated}</p>
                </div>
                <div className="col-12 occBtnContainer">
                    {
                        props.user.occupied === parking._id ? (
                            <button className="occupyButton" onClick={occupyParking}>Free up</button> 
                        ) : (
                            props.user.occupied !== '' ? (
                                <></>
                            ) : (
                                parking.available ? (
                                    <button className="occupyButton" onClick={occupyParking}>Occupy</button> 
                                ) : (
                                    <div className="occupiedWarning">Occupied!!</div>
                                )
                            )
                        )
                    }
                </div>
            </div>
        </div>
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
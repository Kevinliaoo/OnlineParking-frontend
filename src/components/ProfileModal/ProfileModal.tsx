import React from 'react'; 
import axios from 'axios';

import ModalBase from '../ModalBase/ModalBase';
import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';
import { IOtherModals } from '../../interfaces/ModalProps';
import User from '../../objects/User';
import Parking from '../../objects/Parking';

import './styles.css'

interface IProfileProps extends IOtherModals {
    goBack: () => void;
    user: User; 
    goToParking: (parking: Parking) => void;
}

const ProfileModal: React.FC<IProfileProps> = props => {

    const [ userParking, setParking ] = React.useState<Parking>({
        _id: '', 
        location: {
            lat: 0, lng: 0
        }, 
        available: false, 
        city: '',
        address: {
            streetName: '', number: 0
        },
        last_updated: '', 
        counts: 0,
        user: ''
    });

    const goToUserParking = () => {
        props.onClose();
        props.goToParking(userParking);
    }

    React.useEffect(() => {
        const configs = {
            headers: { Authorization: `Bearer ${LSFunctions.getJwtToken()}` }
        };

        if (props.user.occupied !== '') {
            const url = `${config.API.URL}/parkings/${props.user.occupied}`; 
            axios.get(url) 
                .then((response) => {
                    setParking(response.data as Parking);
                })
                .catch(e => {
                    alert('Internal server error')
                })
        }
    }, [props.user])

    const renderModal = () => (
        <div className="container">
            <div className="row">
                <div className="col-12 userInfo">
                    <i className="fas fa-user fa-4x"></i>
                </div>
                <div className="col-12 names">
                    <p>{props.user.firstName}</p>
                    <p>{props.user.lastName}</p>
                    </div>
                <div className="col-12 userInfo">
                    <p>@{props.user.username}</p>
                </div>
                {
                    userParking._id !== '' ? (
                        <div className="col-12 userParkingInfo">
                            <p>Your car was last left in: </p>
                            <p 
                                className="parkingAddress" 
                                onClick={goToUserParking}
                            >
                                {userParking.city} city, {userParking.address.streetName} {userParking.address.number}
                            </p>
                        </div>
                    ) : <></>
                }
            </div>
        </div>
    )

    return (
        <ModalBase
            onClose={props.onClose}
            modalTitle="Profile information"
            isActive={props.isActive}
        >
            {renderModal()}
        </ModalBase>
    )
}

export default ProfileModal;
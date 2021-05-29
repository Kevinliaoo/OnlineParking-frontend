import React from 'react'; 
import axios from 'axios';

import ModalBase from '../ModalBase/ModalBase';
import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';
import { IOtherModals } from '../../interfaces/ModalProps';
import User from '../../objects/User';

import './styles.css'

interface IProfileProps extends IOtherModals {
    goBack: () => void;
}

const ProfileModal: React.FC<IProfileProps> = props => {

    const [user, setUser] = React.useState<User>({
        username: '',
        _id: '',
        firstName: '', 
        lastName: ''
    })

    React.useEffect(() => {
        const url = `${config.API.URL}/users/me`;
        const configs = {
            headers: { Authorization: `Bearer ${LSFunctions.getJwtToken()}` }
        };

        axios.get(url, configs)
            .then(response => {
                setUser(response.data as User);
            })
            .catch(e => {
                alert('Internal server error');
                props.goBack();
            })
    }, [])

    const renderModal = () => (
        <div className="container">
            <div className="row">
                <div className="col-12 userInfo">
                    <i className="fas fa-user fa-4x"></i>
                </div>
                <div className="col-12 names">
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    </div>
                <div className="col-12 userInfo">
                    <p>@{user.username}</p>
                </div>
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
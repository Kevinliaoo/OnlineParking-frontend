import React from 'react'; 
import axios from 'axios';

import ModalBase from '../ModalBase/ModalBase';
import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';
import { IOtherModals } from '../../interfaces/ModalProps';

import './styles.css'

interface IUser {
    username: string; 
    _id: string;
}

interface IProfileProps extends IOtherModals {
    goBack: () => void;
}

const ProfileModal: React.FC<IProfileProps> = props => {

    const [user, setUser] = React.useState<IUser>({
        username: '',
        _id: ''
    })

    React.useEffect(() => {
        const url = `${config.API.URL}/users/me`;
        const configs = {
            headers: { Authorization: `Bearer ${LSFunctions.getJwtToken()}` }
        };

        axios.get(url, configs)
            .then(response => {
                setUser(response.data as IUser);
            })
            .catch(e => {
                props.goBack();
            })
    }, [])

    const renderModal = () => (
        <div className="profileContianer">
            <p> @ {user.username}</p>
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
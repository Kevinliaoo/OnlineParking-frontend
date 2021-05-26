import React from 'react'; 
import axios from 'axios';

import { IModalProps } from '../../interfaces/ModalProps';

import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';

import './styles.css'

interface IUser {
    username: string; 
    _id: string;
}

interface IProfileProps extends IModalProps {
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

    const { isActive } = props;

    const renderModal = () => (
        <div id="addNewModal" className="container-fluid">
            <div className="row">
                <div className="col-10 offset-1 col-md-6 offset-md-3" id="profileInfo">
                    <div className="profileContianer">
                        <p> @ {user.username}</p>
                        <i className="fas fa-times fa-2x" onClick={() => props.onClose(false)}></i>
                    </div>
                </div>
            </div>
        </div>
    )

    return isActive ? renderModal() : <></>
}

export default ProfileModal;
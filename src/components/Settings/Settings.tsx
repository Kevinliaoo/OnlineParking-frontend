import React from 'react'; 

import Line from '../Line/Line';

import './styles.css'

interface ISettingsProps {
    visibility: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
    openProfile: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: () => void; 
    goHome: () => void;
}

const Settings: React.FC<ISettingsProps> = props => {

    const { visibility } = props;

    const renderSettings = () => {
        return (
            <div className="container-fluid" id="settings">
                <div className="row">
                    <div className="col-12 col-md-3" id="settings__menu">
                        <div id="settings__header">
                            <h2 id="settings__title" onClick={props.goHome}>Online Parking</h2>
                            <i className="fas fa-times fa-2x" onClick={() => props.onClose(false)}></i>
                        </div>
                        <Line />
                        <div 
                            id="settings__user" 
                            className="settingsItem"
                            onClick={() => {
                                props.onClose(false); 
                                props.openProfile(true);
                            }}
                        >
                            <i className="fas fa-user fa-2x"></i>
                            <p>My profile</p>
                        </div>
                        <div 
                            id="settings__add" 
                            className="settingsItem" 
                            onClick={() => {
                                props.onClose(false); 
                                props.openModal(true);
                            }}
                        >
                            <i className="fas fa-map-marker-alt fa-2x"></i>
                            <p>Add new</p>
                        </div>
                        <div className="settingsItem" onClick={props.handleLogout}>
                            <i className="fas fa-sign-out-alt fa-2x"></i>
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return visibility ? renderSettings() : <></>
}

export default Settings;
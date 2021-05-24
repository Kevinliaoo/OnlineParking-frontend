import React from 'react'; 

import { settingsPropsInterface } from '../../interfaces/settingsPropsInterface';

import Line from '../Line/Line';

import './styles.css'

const Settings: React.FC<settingsPropsInterface> = props => {

    const { visibility } = props;

    const renderSettings = () => {
        return (
            <div className="container-fluid" id="settings">
                <div className="row">
                    <div className="col-12 col-md-3" id="settings__menu">
                        <div id="settings__header">
                            <h2 id="settings__title">Online Parking</h2>
                            <i className="fas fa-times fa-2x"></i>
                        </div>
                        <Line />
                        <div id="settings__user">
                            <i className="fas fa-user fa-2x"></i>
                            <p>My profile</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // return visibility ? renderSettings() : <></>
    return renderSettings()
}

export default Settings;
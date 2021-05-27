import React from 'react'; 
import axios from 'axios';

import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';
import ILocation from '../../interfaces/ILocation';

import './styles.css';

interface INewParking {
    city: string; 
    streetName: string; 
    number: number; 
    longitude: number; 
    latitude: number; 
}

export interface IModalProps {
    isActive: boolean;
    onClose: () => void;
    defaultLatLng: ILocation; 
}

const AddNewModal: React.FC<IModalProps> = props => {
    
    const { isActive } = props;
    const isDefaultLocation = props.defaultLatLng.lat !== -1 && props.defaultLatLng.lng !== -1;

    const [form, setValues] = React.useState<INewParking>({
        city: '', 
        streetName: '', 
        number: 0,
        longitude: 0,
        latitude: 0
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const numberFields = ['number', 'longitude', 'latitude'];

        if (numberFields.includes(event.target.name)) {
            event.target.name === numberFields[0] ? (
                setValues({
                    ...form, 
                    [event.target.name]: parseInt(event.target.value),
                })
            ) : (
                setValues({
                    ...form, 
                    [event.target.name]: parseFloat(event.target.value),
                })
            )
        } else {
            setValues({
                ...form, 
                [event.target.name]: event.target.value.trim()
            })
        }
    }

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        const submitFormInputs = document.querySelectorAll('.addNewModal__inputField');
        const inputValues = Array.from(submitFormInputs).map((i: any) => i.value);
        if (inputValues.includes('')) {
            alert('Missing values');
            return;
        }
        
        const path: string = '/parkings/new'; 
        const endpoint: string = `${config.API.URL}${path}`;

        const bodyParameters = {
            "city": form.city,
            "address": {
                "streetName": form.streetName,
                "number": form.number,
            },
            "location": {
                "lng": form.longitude,
                "lat": form.latitude,
            }
        }

        axios.post(
            endpoint, 
            bodyParameters, 
            {
                headers: { Authorization:`Bearer ${LSFunctions.getJwtToken()}` }
            }
        )
            .then(() => {
                props.onClose();
            })
            .catch(e => {
                alert('Internal server error'); 
                props.onClose();
            })
    }

    const renderModal = () => (
        <div id="addNewModal" className="container-fluid">
            <div className="row">
                <div className="col-10 offset-1 col-md-6 offset-md-3" id="addNewModal__menu">
                    <div className="closeContainer">
                        <i className="fas fa-times fa-2x" onClick={props.onClose}></i>
                    </div>
                    <div className="titleContainer">
                        <h2>Add new Parking:</h2>
                    </div>
                    <form id="addNewModal__form" onSubmit={handleSubmit}>
                        <input 
                            placeholder="City: " 
                            name="city"
                            onChange={handleChange}
                            className="addNewModal__inputField"
                        />
                        <input 
                            placeholder="Street name: " 
                            name="streetName"
                            onChange={handleChange}
                            className="addNewModal__inputField"
                        />
                        <input 
                            placeholder="Street number: " 
                            type="number" 
                            name="number"
                            onChange={handleChange}
                            className="addNewModal__inputField"
                        />
                        <input 
                            placeholder="Latitude: " 
                            type="number" 
                            step="any"
                            name="latitude"
                            onChange={handleChange}
                            className="addNewModal__inputField"
                            value={isDefaultLocation ? props.defaultLatLng.lat : ''}
                        />
                        <input 
                            placeholder="Longitude: " 
                            type="number" 
                            step="any"
                            name="longitude"
                            onChange={handleChange}
                            className="addNewModal__inputField"
                            value={isDefaultLocation ? props.defaultLatLng.lng : ''}
                        />
                        <button type="submit" >Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

    return isActive ? renderModal() : <></>
}

export default AddNewModal;
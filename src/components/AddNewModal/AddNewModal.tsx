import React from 'react'; 
import axios from 'axios';

import ModalBase from '../ModalBase/ModalBase';
import config from '../../utils/config';
import LSFunctions from '../../utils/localStorage';
import ILocation from '../../interfaces/ILocation';
import { IOtherModals } from '../../interfaces/ModalProps';

import './styles.css';

interface INewParking {
    city: string; 
    streetName: string; 
    number: number; 
    // Default values -1
    longitude: number; 
    latitude: number; 
}

interface IAddNewProps extends IOtherModals {
    defaultLatLng: ILocation; 
}

const AddNewModal: React.FC<IAddNewProps> = props => {

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
                "lng": isDefaultLocation ? props.defaultLatLng.lng : form.longitude,
                "lat": isDefaultLocation ? props.defaultLatLng.lat : form.latitude,
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
    )

    return (
        <ModalBase
            onClose={props.onClose}
            modalTitle={"Add new Parking"}
            isActive={props.isActive}
        >
            {renderModal()}
        </ModalBase>
    )
}

export default AddNewModal;
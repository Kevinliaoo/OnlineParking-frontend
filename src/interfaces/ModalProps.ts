import ILocation from "./ILocation";

export interface IModalProps {
    isActive: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    defaultLatLng?: ILocation; 
}
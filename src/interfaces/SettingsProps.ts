export interface ISettingsProps {
    visibility: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
    openProfile: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogout: () => void; 
}
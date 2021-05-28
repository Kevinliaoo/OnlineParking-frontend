export interface IModalProps extends IOtherModals {
    children: React.ReactNode;
    modalTitle: string;
}

export interface IOtherModals {
    onClose: () => void; 
    isActive: boolean; 
}
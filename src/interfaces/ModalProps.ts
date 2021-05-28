export interface IOtherModals {
    onClose: () => void; 
    isActive: boolean; 
}

export interface IModalProps extends IOtherModals {
    children: React.ReactNode;
    modalTitle: string;
}
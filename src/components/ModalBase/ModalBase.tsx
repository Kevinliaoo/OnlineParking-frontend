import React from 'react'; 


const ModalBase: React.FC = props => {
    return  (
        <div>
            Base del modal 
            {props.children}
        </div>
    )
}

export default ModalBase;
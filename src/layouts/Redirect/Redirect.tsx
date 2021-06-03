import React from 'react'; 

const Redirect: React.FC<any> = props => {
    
    React.useEffect(() => {
        const { history } = props as any;
        history.push('/map')
    }, [])
    
    return (
        <></>
    )
}

export default Redirect;
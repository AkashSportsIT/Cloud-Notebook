import React from 'react';

const Footer = () => {

    const footer = {
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        height:'7%',
        backgroundColor: 'grey',
        color: 'white',
        textAlign: 'center',
    }




    return (
        <>
            <div className='w-100 bg-dark' style={footer}> &copy;Cloud Notebook <br></br> - develop by Akash Kumar</div>
        </>
    )
};

export default Footer;

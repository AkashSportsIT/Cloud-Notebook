import React from 'react';
import Button from './Button'


const LoginHomeScreen = () => {
    return <div>
        <div className=' d-flex d-flex justify-content-around align-items-center main-box'>
            <div className='my-5 text-center'>
                <h1 style={{ fontFamily: "'Comforter', cursive", fontSize: '120px' }}><span style={{ color: 'red' }}>C</span>loud Notes</h1>
                <h5 className='mt-5' style={{ fontFamily: "'Comforter', cursive", fontSize: '30px' }}>Add Your Notes here and Access from Anywhere</h5>
                <h5 style={{ fontFamily: "'Comforter', cursive", fontSize: '30px' }}> - Fast & secure </h5>
            </div>

            <div className='v-line' style={{
                borderLeft: '6px solid #753bbd',
                height: '350px'
            }}></div>

            <div className='d-flex flex-column ' style={{ marginTop: '100px' }}>
                <div>
                    <h4>Go to  Your Notes</h4>
                </div>
                <div className='my-5'>
                    <Button btnTitle={'->  Notes'} uri={'/notes'}/>
                </div>
            </div>
        </div>
    </div>;
};

export default LoginHomeScreen;

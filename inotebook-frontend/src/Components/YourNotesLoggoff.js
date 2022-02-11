import React from 'react';
import Button from './Button';


const YourNotesLoggoff = () => {
    return <div className='container'>
        <h3 className='text-center'>Login to Acces Your Notes..!!</h3>
        <div className='my-5'>
            <Button btnTitle={'Login'} uri={'/login'} />
        </div>
    </div>;
};

export default YourNotesLoggoff;

import React from 'react';
import './Button.css';

const Button = (props) => {
    return <>
        <div className='btn-container'>
            <a href={props.uri} style={{textDecoration: 'none'}}>
            <div  className='buttonStyle'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {props.btnTitle}
            </div>
            </a>
        </div>
    </>;
};

export default Button;

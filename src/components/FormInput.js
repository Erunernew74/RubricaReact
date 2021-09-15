import React from 'react';
import styles from '../styles/FormInput.module.css';

const FormInput = ({id}) => {
    return (
        <>
        <div className={styles.container}>
            <input type="text" id={id}  placeholder="Numero..." />
            <input type="text" name="" id={`tipo-${id.split("-")[1]}`} placeholder="Fisso o Cel"/>
        </div>
            
        </>
    )
}

export default FormInput

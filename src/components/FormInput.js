import React from 'react';
import styles from '../styles/FormInput.module.css';

const FormInput = ({id}) => {
    return (
        <>
        <div className={styles.container}>
            <input type="text" id={id}  placeholder="Numero..." />
        </div>
            
        </>
    )
}

export default FormInput

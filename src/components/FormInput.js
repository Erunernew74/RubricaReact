import React from 'react';
import styles from '../styles/FormInput.module.css';

const FormInput = ({ i, e, handleNumChange }) => {
    return (
        <div>
            <input type="text" name="num" placeholder="Numero..." value={e.num} onChange={(e) => handleNumChange(e, i)} />
            <input type="text" name="tipo" placeholder="Fisso o Cel" value={e.tipo} onChange={(e) => handleNumChange(e, i)} />
        </div>
    )
}

export default FormInput

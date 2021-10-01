import React from 'react'
import styles from '../styles/AggiornaContatto.module.css';

const FormInputDelete = ({ i, e, handleNumChange, eliminaNumero, disabled }) => {
    return (
        <div className={styles.divInput} >
            <input type="number" placeholder="Numero..." name="num" value={e.num} onChange={(e) => handleNumChange(e, i)} disabled={disabled} />
            <input type="text" placeholder="Tel o Cel" name="tipo" value={e.tipo} onChange={(e) => handleNumChange(e, i)} disabled={disabled} />
            <button onClick={() => eliminaNumero(e.id, i)} disabled={disabled}>X</button>
        </div>
    )
}

export default FormInputDelete

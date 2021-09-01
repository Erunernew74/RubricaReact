import { useState, useEffect } from "react";
import styles from '../styles/AggiornaContatto.module.css';

const AggiornaContatto = ({ contatto, contatti }) => {
    const [nome, setNome] = useState(contatto.Nome);
    const [cognome, setCognome] = useState(contatto.Cognome);

    let [inputs, setInputs] = useState([]);
    let [inputs2, setInputs2] = useState([]);

    useEffect(() => {
        const numeriContatto = contatti.filter((e) => e.idContatto == contatto.idContatto)
        console.log(numeriContatto);
        numeriContatto.forEach((e) => {

            let newInput = {
                id: `input-number`,
                value: e.numero
            };
            setInputs((prevInputs) => ([...prevInputs, newInput]));
        })

    }, [])


    const aggiungiCampo = () => {
        let newInput = `input-${inputs2.length}`;
        setInputs2([...inputs2, newInput]);

    }

    return (
        <>
            <h1 style={{textAlign:'center', marginBottom:'45px'}}>Nominativo: {nome} {cognome}</h1>
            <div className={styles.container}>
                
                <div className={styles.inputName}>
                    <input type="text" placeholder="Nome..." value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="text" placeholder="Cognome..." value={cognome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className={styles.inputNumber}>
                    {inputs.map((e, i) => <input type="number" key={i} className={e.id} placeholder={e.value} />)}
                    {inputs2.map((input) => <input type="number" key={input} id={input} />)}
                </div>
                
                <div>
                    <button onClick={(e) => aggiungiCampo(e)} className={styles.btnAggiung}> + AGGIUNGI NUMERO</button>
                </div>
            </div>
                
            

            
        </>
    )
}

export default AggiornaContatto

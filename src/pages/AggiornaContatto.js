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
                id: e.id,
                class: `input-number`,
                value: e.numero
            };
            setInputs((prevInputs) => ([...prevInputs, newInput]));
        })

    }, [])


    const aggiungiCampo = () => {
        let newInput = `input-${inputs2.length}`;
        setInputs2([...inputs2, newInput]);

    }

    const eliminaNumero = async (id) => {
        if (window.confirm(`Vuoi davvero eliminare il numero?`)) {

            const res = await fetch("http://localhost:3031/eliminaNumero", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id })
            });

            const { status } = await res.json();

            setInputs(inputs.filter(e => e.id !== id))
        }

    }
    const aggiornaContatto = async () => {
        if (contatto.Nome != nome || contatto.Cognome != cognome) {
            const res = await fetch("http://localhost:3031/aggiornaContatto", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ nome, cognome })
            });
            const { status } = await res.json()
            console.log(status) 
        }


        let newNumeri = [];
        inputs2.forEach((e, i) => {
            newNumeri.push({ id: null, num: document.querySelector(`#input-${i}`).value });
        })
        inputs.forEach((e, i) => {
            Array.from(document.querySelectorAll(`.input-number`)).filter(e => e.value.trim() != "").forEach(e => {
                newNumeri.push({ id: e.id, num: e.value });
            });
        })

        newNumeri.forEach(async (e) => {
            if (e.id == null) {
                const res = await fetch("http://localhost:3031/inserisciNumero", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ num: e.num, idContatto: contatto.idContatto })
                });
                const { status } = await res.json();
                console.log(status)
            }
            else {
                const res = await fetch("http://localhost:3031/inserisciNumero", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ num: e.num, id: e.id })
                });
                const { status } = await res.json();
                console.log(status)
            }
        })
        console.log(newNumeri)
    }
    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '45px' }}>Nominativo: {nome} {cognome}</h1>
            <div className={styles.container}>

                <div className={styles.inputName}>
                    <input type="text" placeholder="Nome..." value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="text" placeholder="Cognome..." value={cognome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className={styles.inputNumber}>
                    {inputs.map((e, i) => {
                        return (
                            <div className={styles.divInput}>
                                <input type="number" key={i} className={e.class} id={e.id} placeholder={e.value} />
                                <button key={`key-${i}`} onClick={() => eliminaNumero(e.id)}>X</button>
                            </div>
                        )
                    })}
                    {inputs2.map((input) => <input className={styles.numberInputs} type="number" key={input} id={input} />)}
                </div>

                <div>
                    <button onClick={(e) => aggiungiCampo(e)} className={styles.btnAggiung}> + AGGIUNGI NUMERO</button>
                    <button onClick={() => aggiornaContatto()} className={styles.btnAggiung}>AGGIORNA</button>
                </div>
            </div>




        </>
    )
}

export default AggiornaContatto

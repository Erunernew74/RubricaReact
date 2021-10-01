import { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import FormInputDelete from "../components/FormInputDelete";
import UpdateSuccess from "../components/UpdateSuccess";
import styles from '../styles/AggiornaContatto.module.css';


const AggiornaContatto = ({ contatto, contatti }) => {
    const [input, setInput] = useState({ 
        nome: contatto.Nome,  
        cognome: contatto.Cognome })
    const [inputsNum, setInputsNum] = useState([])
    const [disabled, setDisabled] = useState(true);
    const [goToUpdate, setGoToUpdate] = useState(false);

    useEffect(() => {
        const numeriContatto = contatti.filter((e) => e.idContatto == contatto.idContatto)
        console.log(numeriContatto);
        numeriContatto.forEach((e) => {

            let newInput = {
                num: e.numero,
                tipo: e.tipologia,
                id: e.id
            };
            setInputsNum((prevInputs) => ([...prevInputs, newInput]));
        })

    }, []) 
    
    
    const handleNomeCognome = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const handleNumChange = (e, i) => {
        const { name, value } = e.target;
        const newInputsNum = [...inputsNum];
        newInputsNum[i][name] = value;

        setInputsNum(newInputsNum);
    }




    const aggiungiCampo = () => {
        setInputsNum([...inputsNum, { num: "", tipo: "", id: null }])
    }

    const eliminaNumero = async (id, i) => {
        if (!id) {
            const newInputsNum = [...inputsNum];
            newInputsNum.splice(i, 1)
            setInputsNum(newInputsNum)
        }
        else {
            if (window.confirm(`Vuoi davvero eliminare il numero?`)) {
                const res = await fetch("http://localhost:3031/eliminaNumero", {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ id })
                });

                const { status } = await res.json();

                const newInputsNum = [...inputsNum];
                newInputsNum.splice(i, 1)
                setInputsNum(newInputsNum)
            }

        }
    }
    const aggiornaContatto = async () => {
        if (contatto.Nome != input.nome || contatto.Cognome != input.cognome) {
            console.log("ok")
            const res = await fetch("http://localhost:3031/aggiornaContatto", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ nome: input.nome, 
                                       cognome: input.cognome, 
                                       id: contatto.idContatto })
            });
            const { status } = await res.json()
            console.log(status)
        }


        inputsNum.forEach(async (e) => {
            if (e.id == null) {
                const res = await fetch("http://localhost:3031/inserisciNumero", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ num: e.num, tipo: e.tipo, idContatto: contatto.idContatto })
                });
                const { status } = await res.json();
                console.log(status)
            } else {
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
        setGoToUpdate(true);
    }

    const toggleInput = () => {
        setDisabled(!disabled);
    }

    if (goToUpdate)
        return <UpdateSuccess />
    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '45px' }}>Nominativo: {input.nome} {input.cognome}</h1>
            <div className={styles.container}>

                <div className={styles.inputName}>
                    <input 
                        type="text" 
                        placeholder="Nome..." 
                        value={input.nome} 
                        name="nome" 
                        onChange={handleNomeCognome} 
                        disabled={disabled} />
                    <input t
                        ype="text" 
                        placeholder="Cognome..." 
                        value={input.cognome} 
                        name="cognome" 
                        onChange={handleNomeCognome} 
                        disabled={disabled} />
                </div>
                <div className={styles.inputNumber}>
                    {inputsNum.map((e, i) => {
                        return (
                            <FormInputDelete key={i} i={i} e={e} handleNumChange={handleNumChange} eliminaNumero={eliminaNumero} disabled={disabled} />
                        )
                    })}
                </div>

                <div>
                    <button onClick={aggiungiCampo} className={styles.btnAggiung}> + AGGIUNGI NUMERO</button>
                    <button onClick={() => aggiornaContatto()} className={styles.btnAggiung}>AGGIORNA</button>
                    <button onClick={toggleInput}>SBLOCCA</button>
                </div>



            </div>
        </>
    )
}

export default AggiornaContatto

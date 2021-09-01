import { useRef, useState } from "react";
import FormInput from "../components/FormInput";
import Output from "./Output";
import styles from "../styles/InserisciContatto.module.css";

const InserisciContatto = () => {
  // Settaggio dell'input dinamico che sarà settato ad input-0 come valore iniziale
  let [inputs, setInputs] = useState(["input-0"]);
  
  // useRef usato per 'prendere' il value degli input
  const nome = useRef("");
  const cognome = useRef("");
  // const form = useRef("");

  
  // Fetch per l'inserimento dei valori nel database
  const [data, setData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* nome.current.value; // document.querySelector("input").value */
    const numeri = inputs.map((e) => {
      return document.querySelector(`#${e}`).value;
    });
    console.log(numeri);
    const res = await fetch("http://localhost:3030/inserisciContatto", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        nome: nome.current.value,
        cognome: cognome.current.value,
        numero: numeri,
      }),
    });

    setData(await res.json());
  };

  const aggiungiCampo = () => {
    let newInput = `input-${inputs.length}`;
    setInputs([...inputs, newInput]);
  };

  if (data) return <Output data={data} />;

  return (
    <div className={styles.container}>
      <h1>Inserimento contatti</h1>
      <div className={styles.containerItems}>
        <div className={styles.containerInput}>
          <input
            type="text"
            name=""
            id=""
            ref={nome}
            placeholder="Nome..."
            id={styles.idName}
          />
          <input
            type="text"
            name=""
            id=""
            ref={cognome}
            placeholder="Cognome..."
          />
        </div>
        <div className={styles.containerNumber}>
          <div className={styles.inputNumero}>
            <button
              onClick={(e) => aggiungiCampo(e)}
              className={styles.btnAggiungiNumero}
            >
              {" "}
              + AGGIUNGI NUMERO
            </button>
          </div>
          <div className={styles.inputNumeri}>
            {inputs.map((input) => (
              <FormInput key={input} id={input} className={styles.formInput}/>
            ))}
          </div>
        </div>
      </div>

      <button
        className={styles.btnInserisciContatto}
        onClick={(e) => handleSubmit(e)}
      >
        INSERISCI CONTATTO
      </button>
    </div>
  );
};

export default InserisciContatto;

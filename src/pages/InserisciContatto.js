import { useState } from "react";
import FormInput from "../components/FormInput";
import Output from "./Output";
import styles from "../styles/InserisciContatto.module.css";

const InserisciContatto = () => {
  const [input, setInput] = useState({ nome: "", cognome: "" })
  const [inputsNum, setInputsNum] = useState([{ num: "", tipo: "" }])

  const [data, setData] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3031/inserisciContatto", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        nome: input.nome,
        cognome: input.cognome,
        numero: inputsNum,
      }),
    });

    setData(await res.json());
  };

  const handleNumChange = (e, i) => {
    const { name, value } = e.target;
    const newInputsNum = [...inputsNum];
    newInputsNum[i][name] = value;

    setInputsNum(newInputsNum);
  }

  const handleNomeCognome = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  const aggiungiCampo = () => {
    setInputsNum([...inputsNum, { num: "", tipo: "" }])

  };

  if (data) return <Output data={data} />;

  return (
    <div className={styles.container}>
      <h1>Inserimento contatti</h1>
      <div className={styles.containerItems}>
        <div className={styles.containerInput}>
          <input
            type="text"
            name="nome"
            id=""
            placeholder="Nome..."
            value={input.nome}
            id={styles.idName}
            onChange={handleNomeCognome}
          />
          <input
            type="text"
            name="cognome"
            id=""
            placeholder="Cognome..."
            value={input.cognome}
            onChange={handleNomeCognome}
          />
        </div>
        <div className={styles.containerNumber}>
          <div className={styles.inputNumero}>
            <button
              onClick={aggiungiCampo}
              className={styles.btnAggiungiNumero}
            >
              + AGGIUNGI NUMERO
            </button>
          </div>
          <div className={styles.inputNumeri}>
            {inputsNum.map((e, i) => (
              <FormInput key={i} e={e} i={i} handleNumChange={handleNumChange} />
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

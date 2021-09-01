import { useEffect, useState } from "react";
import AggiornaContatto from "./AggiornaContatto";
import EliminaSuccess from "../components/EliminaSuccess";
import styles from '../styles/ListaContatti.module.css';

const ListaContatti = () => {
  const [risCanc, setRisCanc] = useState(false);

  const [risUpdate, setRisUpdate] = useState(false);
  const [contatto, setContatto] = useState({});

  const [contatti, setContatti] = useState([]);
  const [conttattiUnici, setContattiUnici] = useState([]);


  useEffect(() => {
    const getContatti = async () => {
      const res = await fetch("http://localhost:3030/listaContatti");

      const data = await res.json();
      console.log(data);
      setContatti(data);
      setContattiUnici([...new Map(data.map(item => [item["idContatto"], item])).values()])

    };
    getContatti();
  }, []);


  const eliminaContatto = async (nome, cognome, id) => {
    if (window.confirm(`Vuoi davvero eliminare ${nome} ${cognome}`)) {

      const res = await fetch("http://localhost:3030/eliminaContatto", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      const { status } = await res.json();
      setRisCanc(status);
    }
  }


  if (risCanc) return (
    <div>
      {/* <h1>Contatto eliminato!</h1> */}
      <EliminaSuccess />
    </div>
  )
  if (risUpdate) return <AggiornaContatto contatto={contatto} contatti={contatti} />

  if (contatti)
    return (
      <div className={styles.containerTable}>
        <h1>Lista completa dei contatti</h1>
        <table className={styles.tabella}>
          <tr className={styles.trTitle}>
            <th id={styles.thNome} className={styles.th}>Nome</th>
            <th id={styles.thCognome} className={styles.th}>Cognome</th>
            <th id={styles.thAction}>Action</th>
          </tr>
        {conttattiUnici.map((e, index) => {
          return (
            
              <tr key={index}>
                <td>{e.Nome}</td>
                <td>{e.Cognome}</td>
                <td>
                  <div className={styles.containerBtn}>
                    <button onClick={() => eliminaContatto(e.Nome, e.Cognome, e.idContatto)} className={styles.btnAction} id={styles.btnDelete}>ELIMINA</button>
                    <button onClick={() => { setRisUpdate(true); setContatto(e) }} className={styles.btnAction} id={styles.btnUpdate}>AGGIORNA</button>
                  </div>
                </td> 
              </tr>
            );
          })}
        </table >
      </div>
      );
  return (
    <div>
      <h1>Nessun contatto...</h1>
    </div>
  );
};

export default ListaContatti;

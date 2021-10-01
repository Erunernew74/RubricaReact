import {useState,useEffect} from 'react'
import AggiornaContatto from './AggiornaContatto'
const CercaContatto = () => {
    const [inputs,setInputs] = useState({nome:"",cognome:"", tipo:"", numero:""})
    const [data,setData] = useState([])
    const [conttattiUnici, setContattiUnici] = useState([]);
    const [errors,setErrors] = useState([])
    const [risUpdate, setRisUpdate] = useState(false);
    const [contatto, setContatto] = useState({});


    const handleForm  = async (e)=>{
        setErrors([])
        e.preventDefault();
        const res = await fetch("http://localhost:3031/cercaContatto",{
            method:"POST",
            headers:{
                "Content-type" :"application/json"
            },
            body: JSON.stringify(inputs)
        })

        const contatti = await res.json();
        console.log(contatti);
        if(contatti.error)
            setErrors(contatti.error)
        else
            setData(contatti)

    }
    useEffect(()=>{
       setContattiUnici([...new Map(data.map(item => [item["idContatto"], item])).values()])
    },[data])
    const handleInput = (e) => {
        const {name,value} = e.target;
        setInputs({...inputs,[name]: value})
        
    }

  if (risUpdate) return <AggiornaContatto contatto={contatto} contatti={data} />

    return (
        <div>
            
            <form>
                <input type="text" name="nome" id="" placeholder="Nome..." onChange={handleInput}/>
                <input type="text" name="cognome" id="" placeholder="Cognome..." onChange={handleInput}/>
                <input type="text" name="tipo" id=""  placeholder="Tipo..." onChange={handleInput}/>
                <input type="number" name="numero" id="" placeholder="Numero..." onChange={handleInput}/>
                <button onClick={handleForm}>CERCA</button>
            </form>
            <p>Sono presenti {conttattiUnici.length} contatti</p>
        <div>
            {errors.map((e,i)=>{
                return (
                    <h1 key={i}>{e.message}</h1>
                )
            })}
        </div>
            <div>
                {conttattiUnici.map((e,i)=>{
                    
                    return (
                        <tr key={i} onClick={() => { setRisUpdate(true); setContatto(e) }}>
                            <td>{e.Nome}</td>
                            <td>{e.Cognome}</td>
                        </tr>

                    )
                })}
            </div>
        </div>
    )
}

export default CercaContatto

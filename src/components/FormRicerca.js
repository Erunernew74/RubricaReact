const FormRicerca = () => {
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const contatto = document.querySelector("#contatto").value

        const ris = await fetch("http://localhost:3030/cercaContatto",{
            method:"POST",
            headers:{
                "Content-type" : "application/json",
            },
            body: JSON.stringify({contatto})
        })

        const data = await ris.json();

        console.log(data);
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="contatto" id="contatto" placeholder="Cerca..."/>
            <input type="submit" value="CERCA" />
        </form>
    )
}

export default FormRicerca

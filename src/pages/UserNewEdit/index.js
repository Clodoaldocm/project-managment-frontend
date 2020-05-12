import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

function ValidationMessage(props) {
      return(
        <div className='error-msg'>{props.message}</div>
      )
   }

const GetUser = () => {
    // Create state variables
    const id = localStorage.getItem("userId");
    const edit = localStorage.getItem("userEdit");
    const history = useHistory();
    const [contributor_name, setUserName] = useState('');
    const [contributor_function,setUserFunction] = useState('');
    const [contributor_sector,setUserSector] = useState('');
    const [messageError, setMessageError] = useState('');
    const [sectors, setSectors] = useState([]);
    var title;
    if(edit==1){
        title = 'Editar Usuário';
    }else{
        title = "Novo Usuário";
    }
    // fetches data
    const fetchData = (e) => {
        //e.preventDefault()
        api.get('user/'+id)
        .then((response)=>{
            setUserName(response.data.contributor_name)
            setUserFunction(response.data.contributor_function)
            setUserSector(response.data.contributor_sector)
        })
        .catch((error) => {
            console.log(error)
        })

        api.get("sector/0")
        .then((res)=>{
            setSectors(res.data)
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    useEffect(() => {fetchData(1)},[id])
     
    async function handleEdit(e){
        e.preventDefault();
        localStorage.setItem("userId", -1);
        localStorage.setItem("userEdit", 0);
       
        const data = {
            contributor_name,
            contributor_function,
            contributor_sector
        }
        if(contributor_name.length<1 || contributor_function<1){
            setMessageError('Descrição do Setor não pode ser Vazio!')
            return

        }
        try{
            if(edit==1){
                const response = await api.post('user/'+id,data);
            }else{
                const response = await api.post('user',data);
            }
            history.push('../users');
        }catch(error){
            alert("Erro no Cadastro. tente Novamente!")
        }
         
    }


    function handleCancel(){
        localStorage.setItem("userId", -1);
        localStorage.setItem("userEdit", 0);
        history.push('/users');
          
    }

    function SectorId(sec_id, use_sec){
        if(sec_id==use_sec){
            return "Selected";
        }else{
            return "";
        }
    }

    return (
        <div className="profile-container">
        <header>
            <section className="P_Header">
            <img src={logoImg} alt="Io Losung"/>
            <span> Programa de Gerenciamento de Projetos</span>
            </section>
            
        </header>
        
        
        <section className="groupUser">
        <span>{title}:</span><br/>    
        <form onSubmit={handleEdit}>
        < ValidationMessage message={messageError} />
            <label for="name">Nome do usuário</label>
            <input 
                type="text"
                id="name"
                value={contributor_name}
                onChange={e => setUserName(e.target.value)}
              ></input><br/>
            <label for="function">Nome do usuário</label>
            <input 
                type="text"
                id="function"
                value={contributor_function}
                onChange={e => setUserFunction(e.target.value)}
              ></input><br/>
            <label for="sector">Nome do usuário</label>
            <select id="sector" onChange={e => setUserSector(e.target.value)}> 
                <option value="0" text="Selecione" id="0">Selecione um setor ...</option>
                {sectors.map( sectors=>(
                <option 
                value={sectors.sector_id}
                selected={SectorId(sectors.sector_id, contributor_sector)}
                text={sectors.sector_name}
                id={sectors.sector_id}
                >{sectors.sector_name}</option>
                ))}
                </select><br/>  
            <button type='submit'>Salvar</button>
            <button onClick={(e) => handleCancel()} type='button'>Cancelar</button>
        </form>
        </section>
        </div>
    )
}
export default GetUser
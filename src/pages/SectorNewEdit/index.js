import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2,FiEdit3} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

function ValidationMessage(props) {
      return(
        <div className='error-msg'>{props.message}</div>
      )
   }

const GetSector = () => {
    // Create state variables
    const id = localStorage.getItem("SectorID");
    const edit = localStorage.getItem("SectorEdit");
    const history = useHistory();
    const [sector_name, setSectorName] = useState('');
    const [val_sector,setValSector] = useState('');

    // fetches data
    const fetchData = (e) => {
        //e.preventDefault()
        api.get('sector/'+id)
        .then((response)=>{
            setSectorName(response.data.sector_name)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {fetchData(1)},[id])
     
    async function handleEdit(e){
        e.preventDefault();
        localStorage.setItem("SectorID", -1);
        localStorage.setItem("SectorEdit", 0);
       
        const data = {
            sector_name
        }
        if(sector_name.length<1){
            setValSector('Descrição do Setor não pode ser Vazio!')
            return

        }
        try{
            if(edit==1){
                const response = await api.post('sector/'+id,data);
            }else{
                const response = await api.post('sector',data);
            }
            history.push('../sectors');
        }catch(error){
            alert("Erro no Cadastro. tente Novamente!")
        }
         
    }


    function handleCancel(){
        localStorage.setItem("SectorID", -1);
        localStorage.setItem("SectorEdit", 0);
        history.push('/sectors');
          
    }


    return (
        <div className="profile-container">
        <header>
            <section className="P_Header">
            <img src={logoImg} alt="Io Losung"/>
            <span> Programa de Gerenciamento de Projetos</span>
            </section>
            
        </header>
        
        
        <section className="groupSector">
        <span>Editar Setor:</span><br/>    
        <form onSubmit={handleEdit}>
        < ValidationMessage message={val_sector} />
            <input type="text"
             value={sector_name}
             onChange={e => setSectorName(e.target.value)}
              ></input><br/>
            <button type='submit'>Salvar</button>
            <button onClick={(e) => handleCancel()} type='button'>Cancelar</button>
        </form>
        </section>
        </div>
    )
}
export default GetSector
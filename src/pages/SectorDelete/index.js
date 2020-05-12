import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';


const DeleteSector = () => {
    // Create state variables
    const id = localStorage.getItem("SectorID");
    const history = useHistory();
    const [sector_name, setSectorName] = useState('');

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
     
    async function handleDelete(e){
        e.preventDefault();
        localStorage.setItem("SectorID", -1);
        localStorage.setItem("SectorEdit", 0);
      
        try{
            const response = await api.delete('sector/'+id);
            //alert(response.error);
            history.push('/sectors'); 
        }catch(error){
            alert("Setor não pode ser excluído! Já foi utilizado")
            history.push('/sectors');
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
        <span>Deseja Realmente Excluir o Setor:</span><br/>    
        <form onSubmit={handleDelete}>
            <p> 
             {sector_name}
              </p><br/>
            <button type='submit'>Sim</button>
            <button onClick={(e) => handleCancel()} type='button'>Não</button>
        </form>
        </section>
        </div>
    )
}
export default DeleteSector
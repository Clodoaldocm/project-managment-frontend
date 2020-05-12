import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';


import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';


const DeleteIndicator = () => {
    // Create state variables
    const id = localStorage.getItem("IndId");
    const history = useHistory();
    const [ind_name, setIndName] = useState('');

    // fetches data
    const fetchData = (e) => {
        //e.preventDefault()
        api.get('indicator/'+id)
        .then((response)=>{
            setIndName(response.data.ind_name)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {fetchData(1)},[id])
     
    async function handleDelete(e){
        e.preventDefault();
        localStorage.setItem("IndId", -1);
     
        try{
            const response = await api.delete('indicator/'+id);
            //alert(response.error);
            history.push('/indicators'); 
        }catch(error){
            alert("Indicador não pode ser excluído! Já foi utilizado")
            history.push('/indicators');
        }
         
    }


    function handleCancel(){
        localStorage.setItem("IndId", -1);
        history.push('/indicators');
          
    }


    return (
        <div className="profile-container">
        <header>
            <section className="P_Header">
            <img src={logoImg} alt="Io Losung"/>
            <span> Programa de Gerenciamento de Projetos</span>
            </section>
            
        </header>
        
        
        <section className="groupInd">
        <span>Deseja Realmente Excluir o Indicador:</span><br/>    
        <form onSubmit={handleDelete}>
            <p className="indDelete"> 
             {ind_name}
              </p><br/>
            <button type='submit'>Sim</button>
            <button onClick={(e) => handleCancel()} type='button'>Não</button>
        </form>
        </section>
        </div>
    )
}
export default DeleteIndicator
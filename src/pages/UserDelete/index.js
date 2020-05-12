import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';


import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';


const DeleteUser = () => {
    // Create state variables
    const id = localStorage.getItem("userId");
    const history = useHistory();
    const [users, setUsers] = useState('');
    //alert(id);
        // fetches data
    const fetchData = (e) => {
        //e.preventDefault()
        api.get('user/'+id)
        .then((response)=>{
            //alert(response.contributor_name)
            setUsers(response.data.contributor_name)
        })
        .catch((error) => {
            alert(error)
        })
    }
    useEffect(() => {fetchData(1)},[id])
     
    async function handleDelete(e){
        e.preventDefault();
        localStorage.setItem("userId", -1);
     
        try{
            const response = await api.delete('user/'+id);
            //alert(response.error);
            history.push('/users'); 
        }catch(error){
            alert("Usuário não pode ser excluído! Já foi utilizado")
            history.push('/users');
        }
         
    }


    function handleCancel(){
        localStorage.setItem("userId", -1);
        history.push('/users');
          
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
        <span>Deseja Realmente Excluir o Usuário:</span><br/>    
        <form onSubmit={handleDelete}>
            <p> 
              {users}
              </p><br/>
            <button type='submit'>Sim</button>
            <button onClick={(e) => handleCancel()} type='button'>Não</button>
        </form>
        </section>
        </div>
    )
}
export default DeleteUser
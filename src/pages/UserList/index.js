import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2,FiEdit3} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
//import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.png';

export default function UserList(){
    const [users, setUsers] = useState([]);
    const history = useHistory();
    var x=0;
    useEffect(() => {
     try{   
        api.get('user/0')
           .then(function(response){
            setUsers(response.data);
            //(response.data);
        });
    } catch (err) {
        alert('Falha em buscar Usuários, tente novamente.');            
    }
    });

    
    function handleDelete(id){
        
        localStorage.setItem("userId", id);
        history.push('/user/delete/'+id);

    }
    function handleEdit(id){
        localStorage.setItem("userId", id);
        localStorage.setItem("userEdit", 1);
        history.push('/user/user');
          
    }
    function handleNew(){
        localStorage.setItem("userId", -1);
        localStorage.setItem("userEdit", 0);
        history.push('/user/user');
          
    }

    function handleHome(){
        history.push('/');
    }

    function item(){

        x++;
        return x;
    }

    return(
        <div className="profile-container">
        <header>
            <section className="P_Header">
            <img src={logoImg} alt="Io Losung"/>
            <span> Programa de Gerenciamento de Projetos</span>
            </section>
            
        </header>
        <span className="TabTitle">Colaboradores Cadastrados</span>
        <Link className="buttonHome" onClick={handleHome}>Home</Link>
        <Link className="button" onClick={handleNew}>Cadastrar Novo Colaborador</Link>
        
            <section className="listTable">
                <div className="listHead">#</div>
                <div className="listHead">Nome</div>
                <div className="listHead">Função</div>
                <div className="listHead">Setor</div>
                <div className="listHead">Funções</div>
                
            </section>
                
            { users.map(users => (
                <section className="listTable">   
                <div className="listItem">{item()}</div>
                <div className="listItem">{users.contributor_name}</div>
                <div className="listItem">{users.contributor_function}</div>
                <div className="listItem">{users.sector_name}</div>
                <div className="listItem">
                    <button onClick={() => handleEdit(users.contributor_id)} type="button">
                        <FiEdit3 size={12} color="#373DBD" />
                    </button>
                    <button onClick={() => handleDelete(users.contributor_id)} type="button">
                        <FiTrash2 size={12} color="#FF5733" />
                    </button>
                </div>
                </section>
                
                ))}
                

           
         
    </div>
            

    );
}
import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2,FiEdit3} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
//import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.png';

export default function ProjList(){
    const [projs, setProjs] = useState([]);
    const history = useHistory();
    var x=0;
    useEffect(() => {
     try{   
        api.get('projects/projs')
           .then(function(response){
            setProjs(response.data);
            //(response.data);
        });
    } catch (err) {
        alert('Falha em buscar Projetos, tente novamente.');            
    }
    });

    
    function handleDelete(id){
        
        localStorage.setItem("projId", id);
        history.push('/project/delete/'+id);

    }
    function handleEdit(id){
        localStorage.setItem("projId", id);
        localStorage.setItem("projEdit", 1);
        history.push('/project/project');
          
    }
    function handleNew(){
        localStorage.setItem("projId", -1);
        localStorage.setItem("projEdit", 0);
        history.push('/project/project');
          
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
        <span className="TabTitle">Projetos Cadastrados</span>
        <Link className="buttonHome" onClick={handleHome}>Home</Link>
        <Link className="button" onClick={handleNew}>Cadastrar Novo Projeto</Link>
        
        
            <section className="listTable">
                <div className="listHead">#</div>
                <div className="listHead">Título</div>
                <div className="listHead">Responsável</div>
                <div className="listHead">Setor</div>
                <div className="listHead">Inicio</div>
                <div className="listHead">Prazo</div>
                <div className="listHead">Fim</div>
                <div className="listHead">Funções</div>
                
            </section>
                
            { projs.map(projs => (
                <section className="listTable">   
                <div className="listItem">{item()}</div>
                <div className="listItem">{projs.proj_title}</div>
                <div className="listItem">{projs.contributor_name}</div>
                <div className="listItem">{projs.sector_name}</div>
                <div className="listItem">{projs.proj_date_start}</div>
                <div className="listItem">{projs.proj_deadline}</div>
                <div className="listItem">{projs.proj_date_end}</div>
                <div className="listItem">
                    <button onClick={() => handleEdit(projs.proj_id)} type="button">
                        <FiEdit3 size={12} color="#373DBD" />
                    </button>
                    <button onClick={() => handleDelete(projs.proj_id)} type="button">
                        <FiTrash2 size={12} color="#FF5733" />
                    </button>
                </div>
                </section>
                
                ))}
                

           
         
    </div>
            

    );
}
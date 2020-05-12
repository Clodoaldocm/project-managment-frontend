import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2,FiEdit3} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
//import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.png';

export default function Sector(){
    const [sectors, setSectors] = useState([]);
    const history = useHistory();
    var x=0;
    useEffect(() => {
     try{   
        api.get('sector/0')
           .then(function(response){
            setSectors(response.data);
            //(response.data);
        });
    } catch (err) {
        alert('falha no login, tente novamente.');            
    }
    });

    
    function handleDelete(id){
        
        localStorage.setItem("SectorID", id);
        history.push('/sector/delete/'+id);

    }
    function handleEdit(id){
        localStorage.setItem("SectorID", id);
        localStorage.setItem("SectorEdit", 1);
        history.push('/sector/sector');
          
    }
    function handleNew(){
        localStorage.setItem("SectorID", -1);
        localStorage.setItem("SectorEdit", 0);
        history.push('/sector/sector');
          
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
        <span className="TabTitle">Setores Cadastrados</span>
        <Link className="buttonHome" onClick={handleHome}>Home</Link>
        <Link className="button" onClick={handleNew}>Cadastrar Novo Setor</Link>
        
            <section className="listSector">
                <div className="listHead listCol1">#</div>
                <div className="listHead listCol2">Descrição</div>
                <div className="listHead listCol3">Funções</div>
            </section>
                
            { sectors.map(sectors => (
                <section className="listSector">   
                <div className="listItem">{item()}</div>
                <div className="listItem">{sectors.sector_name}</div>
                <div className="listItem">
                    <button onClick={() => handleEdit(sectors.sector_id)} type="button">
                        <FiEdit3 size={12} color="#373DBD" />
                    </button>
                    <button onClick={() => handleDelete(sectors.sector_id)} type="button">
                        <FiTrash2 size={12} color="#FF5733" />
                    </button>
                </div>
                </section>
                
                ))}
                

           
         
    </div>
            

    );
}
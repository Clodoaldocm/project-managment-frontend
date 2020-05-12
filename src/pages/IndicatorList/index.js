import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2,FiEdit3} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
//import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.png';

export default function IndicatorList(){
    const [indicators, setIndicators] = useState([]);
    const history = useHistory();
    var x=0;
    useEffect(() => {
     try{   
        api.get('indicator/0')
           .then(function(response){
            setIndicators(response.data);
            //(response.data);
        });
    } catch (err) {
        alert('falha no login, tente novamente.');            
    }
    });

    
    function handleDelete(id){
        
        localStorage.setItem("IndId", id);
        history.push('/indicator/delete/'+id);

    }
    function handleEdit(id){
        localStorage.setItem("IndId", id);
        localStorage.setItem("IndEdit", 1);
        history.push('/indicator/indicator');
          
    }
    function handleNew(){
        localStorage.setItem("IndId", -1);
        localStorage.setItem("IndEdit", 0);
        history.push('/indicator/indicator');
          
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
        <span className="TabTitle">Indicadores Cadastrados</span>
        <Link className="buttonHome" onClick={handleHome}>Home</Link>
        <Link className="button" onClick={handleNew}>Cadastrar Novo Indicador</Link>
        
            <section className="listTable">
                <div className="listHead">#</div>
                <div className="listHead">Descrição</div>
                <div className="listHead">Unidade</div>
                <div className="listHead">funções</div>
            </section>
                
            { indicators.map(indicators => (
                <section className="listTable">   
                <div className="listItem">{item()}</div>
                <div className="listItem">{indicators.ind_name}</div>
                <div className="listItem">{indicators.ind_type}</div>
                <div className="listItem">
                    <button onClick={() => handleEdit(indicators.ind_id)} type="button">
                        <FiEdit3 size={12} color="#373DBD" />
                    </button>
                    <button onClick={() => handleDelete(indicators.ind_id)} type="button">
                        <FiTrash2 size={12} color="#FF5733" />
                    </button>
                </div>
                </section>
                
                ))}
                

           
         
    </div>
            

    );
}
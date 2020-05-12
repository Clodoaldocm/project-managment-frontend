import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiTrash2,FiEdit3} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
//import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.png';
import logoUser from '../../assets/teamwork.bmp';
import logoSetor from '../../assets/enterprise.bmp';
import logoInd from '../../assets/project-plan.bmp';
import logoProj from '../../assets/project.bmp';

export default function ProjList(){
    const history = useHistory();

    function handleUsers(){
        history.push('/users/0');

    }
    function handleSectors(){
        history.push('/sectors/0');
          
    }
    function handleIndicators(){
        history.push('/indicators/0');
          
    }

    function handleProjects(){
        history.push('/projects/0');
          
    }

    return(
        <div className="profile-container">
        <header>
            <section className="P_Header">
            <img src={logoImg} alt="Io Losung"/>
            <span> Programa de Gerenciamento de Projetos</span>
            </section>
            
        </header>

        <div className="Menus">
            <div className="buttons" onClick={handleUsers}>
                <img src={logoUser} alt="Colaboradores" /><br/>
                <span>Colaboradores</span>
            </div>
            <div className="buttons" onClick={handleSectors}>
                <img src={logoSetor} alt="Colaboradores" /><br/>
                <span>Setores</span>
            </div>
            <div className="buttons" onClick={handleIndicators}>
                <img src={logoInd} alt="Colaboradores" /><br/>
                <span>Indicadores</span>
            </div>
            <div className="buttons" onClick={handleProjects}>
                <img src={logoProj} alt="Colaboradores" /><br/>
                <span>Projetos</span>
            </div>

        </div>
    </div>
            

    );
}
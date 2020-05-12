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

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }   

const GetProjs = () => {
    // Create state variables
    const id = localStorage.getItem("projId");
    const edit = localStorage.getItem("projEdit");
    const history = useHistory();
    const [proj_title, setProjTitle] = useState('');
    const [proj_objective,setProjObjective] = useState('');
    const [proj_justification,setProjJustification] = useState('');
    const [proj_sector,setProjSector] = useState('');
    const [proj_responsible,setProjResponsible] = useState('');
    const [proj_indicator_type,setProjIndicator] = useState('');
    const [proj_value_indicator,setIndicatorValue] = useState('');
    const [proj_date_start,setProjDateStart] = useState('');
    const [proj_deadline,setProjDeadLine] = useState('');
    const [proj_custoIni,setProjCustoIni] = useState('');
    const [proj_value_actual,setProjValueActual] = useState('');
    const [proj_value_esp,setProjValueEsp] = useState('');
    const [messageError, setMessageError] = useState('');
    const [sectors, setSectors] = useState([]);
    const [users, setUsers] = useState([]);
    const [indicators, setIndicators] = useState([]);

    var title;
    //alert(id);
    if(edit==1){
        title = 'Editar Projeto';

    }else{
        title = "Novo Projeto";
    }
    // fetches data
    const fetchData = (e) => {
        //e.preventDefault()
        api.get('projects/'+id)
        .then((response)=>{
            setProjTitle(response.data.proj_title)
            setProjObjective(response.data.proj_objective)
            setProjJustification(response.data.proj_justification)
            setProjSector(response.data.proj_sector)
            setProjResponsible(response.data.proj_responsible)
            setProjIndicator(response.data.proj_indicator_type)
            setIndicatorValue(response.data.proj_value_indicator)
            setProjDateStart(response.data.proj_date_start)
            setProjDeadLine(response.data.proj_deadline)
            setProjCustoIni(response.data.proj_custoIni)
            setProjValueActual(response.data.proj_value_actual)
            setProjValueEsp(response.data.proj_value_esp)
            

        })
        .catch((error) => {
            console.log(error)
        })

        api.get("sector/0")
        .then((res)=>{
            setSectors(res.data)
        })
        .catch(() =>{
            console.log('Erro ao Buscar Setores')
        })

        api.get("user/0")
        .then((res)=>{
            setUsers(res.data)
        })
        .catch(() =>{
            console.log('Erro ao Buscar usuários')
        })

        api.get("indicator/0")
        .then((res)=>{
            setIndicators(res.data)
        })
        .catch(() =>{
            console.log('Erro ao Buscar Indicadores')
        })

    }
        useEffect(() => {fetchData(1)},[id])

     
    async function handleEdit(e){
        e.preventDefault();
        localStorage.setItem("projId", -1);
        localStorage.setItem("projEdit", 0);
       
        const data = {
            proj_title,
            proj_objective,
            proj_justification,
            proj_sector,
            proj_responsible,
            proj_indicator_type,
            proj_date_start,
            proj_deadline,
            proj_custoIni,
            proj_value_actual,
            proj_value_esp
        }
        if(proj_title.length<1){
            setMessageError('Descrição do Projeto não pode ser Vazio!');
            window.scrollTo(0, 0);
            return
        }
        if(proj_objective.length<1){
            setMessageError('Objetivo do Projeto não pode ser Vazio!');
            window.scrollTo(0, 0);
            return
        }
        if(proj_justification.length<1){
            setMessageError('Justificativa do Projeto não pode ser Vazio!');
            window.scrollTo(0, 0);
            return
        }
        
        if(proj_responsible=="0" || proj_responsible==""){
            setMessageError('Selecione um Responsável!');
            window.scrollTo(0, 0);
            return
        }
        
        if(proj_sector=="0" || proj_sector==""){
            setMessageError('Selecione um Setor!');
            window.scrollTo(0, 0);
            return
        }
        if(proj_indicator_type=="0" || proj_indicator_type==""){
            setMessageError('Selecione um Indicador!');
            window.scrollTo(0, 0);
            return
        }

        if(proj_value_actual.length<1 || !isNumeric(proj_value_actual)){
            setMessageError('Valor Atual do Indicador dever ser um número! (Numérico com ".")!');
            window.scrollTo(0, 0);
            return
        }
        if(proj_value_esp.length<1 || !isNumeric(proj_value_esp)){
            setMessageError('Valor Esperado do Indicador dever ser um número! (Numérico com ".")!');
            window.scrollTo(0, 0);
            return
        }

        if(proj_date_start.length<1){
            setMessageError('Selecione uma data de início válida!');
            window.scrollTo(0, 0);
            return
        }

        if(proj_deadline.length<1){
            setMessageError('Selecione uma data de prazo válida!');
            window.scrollTo(0, 0);
            return
        }

        if(proj_deadline.length<1){
            setMessageError('Selecione uma data de prazo válida!');
            window.scrollTo(0, 0);
            return
        }
        
        if(proj_custoIni>0){
            if(!isNumeric(proj_custoIni)){
                setMessageError('Custo Previsto deve ser um valor válido! (Numérico com ".")!');
                window.scrollTo(0, 0);
                return
            }
        }


        try{
            if(edit==1){
                const response = await api.post('projects/'+id,data);
            }else{
                const response = await api.post('projects',data);
            }
            history.push('../projects');
        }catch(error){
            alert("Erro no Cadastro. tente Novamente!")
        }
         
    }


    function handleCancel(){
        localStorage.setItem("projId", -1);
        localStorage.setItem("projEdit", 0);
        history.push('/projects');
          
    }

    function SectorId(sec_id, proj_sec){
        if(sec_id==proj_sec){
            return "Selected";
        }else{
            return "";
        }
    }

    function UserId(use_id, proj_use){
        if(use_id==proj_use){
            return "Selected";
        }else{
            return "";
        }
    }

    function IndicatorId(ind_id, proj_ind){
        if(ind_id==proj_ind){
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
        
        
        <section className="groupProj">
        <span>{title}:</span><br/>    
        <form onSubmit={handleEdit}>
        < ValidationMessage message={messageError} />
            <label for="name">Título do Projeto</label>
            
                       
            <input 
                type="text"
                id="name"
                value={proj_title}
                onChange={e => setProjTitle(e.target.value)}
              ></input><br/>
            
            <label for="objective">Objetivo do Projeto</label>
            
            <textarea 
                rows="2"
                id="objective"
                value={proj_objective}
                onChange={e => setProjObjective(e.target.value)}
              ></textarea><br/>
            
            <label for="justification">Justificativa do Projeto</label>
            
            <textarea 
                rows="2"
                id="justification"
                value={proj_justification}
                onChange={e => setProjJustification(e.target.value)}
              ></textarea><br/>
              <div className="respSetor">
                <div className="respon">
                    <label for="resp">Responsável</label>
                    
                    <select id="resp" onChange={e => setProjResponsible(e.target.value)}> 
                    <option value="0" text="Selecione" id="0">Selecione um Colaborador ...</option>
                        {users.map( users=>(
                        <option 
                        value={users.contributor_id}
                        selected={UserId(users.contributor_id, proj_responsible)}
                        text={users.contributor_name}
                        id={users.contributor_id}
                        >{users.contributor_name}</option>
                        ))}
                        </select> 
                </div>  
                <div className="sector">
                    <label for="sector">Setor</label>
                    <select id="sector" onChange={e => setProjSector(e.target.value)}> 
                    <option value="0" text="Selecione" id="0">Selecione um setor ...</option>
                        {sectors.map( sectors=>(
                        <option 
                        value={sectors.sector_id}
                        selected={SectorId(sectors.sector_id, proj_sector)}
                        text={sectors.sector_name}
                        id={sectors.sector_id}
                        >{sectors.sector_name}</option>
                        ))}
                    </select>  
                </div>
            </div>     
            
            <div className="indicador">
                <div className="indType">
                    <label for="indicator">Indicador</label>
                    
                    <select id="indicator" onChange={e => setProjIndicator(e.target.value)}> 
                    <option value="0" text="Selecione" id="0">Selecione um Indicador ...</option>
                        {indicators.map( indicators=>(
                        <option 
                        value={indicators.ind_id}
                        selected={IndicatorId(indicators.ind_id, proj_indicator_type)}
                        text={indicators.ind_name}
                        id={indicators.ind_id}
                        >{indicators.ind_name}</option>
                        ))}
                        </select>
                </div> 
                <div className="indValorAtual">           
                    <label for="IndValor">Valor Atual</label> 

                    <input 
                        type="text"
                        id="IndValor"
                        value={proj_value_actual}
                        onChange={e => setProjValueActual(e.target.value)}
                    ></input> 
                </div>
                <div className="indValorEsp">
                    <label for="EspValor">Valor Esperado</label> 

                    <input 
                        type="text"
                        id="EspValor"
                        value={proj_value_esp}
                        onChange={e => setProjValueEsp(e.target.value)}
                    ></input> 
                </div>
            </div>

            <div className="dates">
                <div className="datesblock">
                    <label for="date1">Data Início</label>
                    
                    <input 
                        type="date"
                        id="date1"
                        value={proj_date_start}
                        onChange={e => setProjDateStart(e.target.value)}
                    ></input>
                </div>
                <div className="datesblock">
                    <label for="deadline">Prazo</label>
                    
                    <input 
                        type="date"
                        id="deadline"
                        value={proj_deadline}
                        onChange={e => setProjDeadLine(e.target.value)}
                    ></input><br/> 
                </div>    
            </div>
            <div className="custo">
            <label for="custo">Custo Previsto</label> 

            <input 
                type="text"
                id="custo"
                value={proj_custoIni}
                onChange={e => setProjCustoIni(e.target.value)}
            ></input>
            </div>
                


            <button type='submit'>Salvar</button>
            <button onClick={(e) => handleCancel()} type='button'>Cancelar</button>
        </form>
        </section>
        </div>
    )
}
export default GetProjs
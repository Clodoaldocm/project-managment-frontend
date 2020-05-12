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

const GetIndicator = () => {
    // Create state variables
    const id = localStorage.getItem("IndId");
    const edit = localStorage.getItem("IndEdit");
    const history = useHistory();
    const [ind_name, setIndName] = useState('');
    const [ind_type, setIndType] = useState('');
    const [messageErro, setMessageErro] = useState('');
    var title;

    if(edit===1){
        title = 'Editar Indicador';
    }else{
        title = 'Novo Indicador';
    }
    // fetches data
    const fetchData = (e) => {
        //e.preventDefault()
        api.get('indicator/'+id)
        .then((response)=>{
            setIndName(response.data.ind_name)
            setIndType(response.data.ind_type)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {fetchData(1)},[id])
     
    async function handleEdit(e){
        e.preventDefault();
        localStorage.setItem("IndId", -1);
        localStorage.setItem("IndEdit", 0);
       
        const data = {
            ind_name,
            ind_type
        }
        if(ind_name.length<1 || ind_type<1){
            setMessageErro('Descrição e Unidade do Indicator não pode ser Vazio!')
            return
        }
        try{
            if(edit==1){
                const response = await api.post('indicator/'+id,data);
            }else{
                const response = await api.post('indicator',data);
            }
            history.push('../indicators');
        }catch(error){
            alert("Erro no Cadastro. tente Novamente!")
        }
         
    }


    function handleCancel(){
        localStorage.setItem("IndId", -1);
        localStorage.setItem("IndEdit", 0);
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
        <span>{title}:</span><br/>    
        <form className="form-inline" onSubmit={handleEdit}>
        < ValidationMessage message={messageErro} />
            <label for="name">Descrição</label>
            <input 
             type="text"
             id="name"
             value={ind_name}
             onChange={e => setIndName(e.target.value)}
              ></input><br/>
            <label for="indtype">Unidade</label>  
            <input 
             type="text"
             id="indtype"
             value={ind_type}
             onChange={e => setIndType(e.target.value)}
              ></input><br/>
            <button type='submit'>Salvar</button>
            <button onClick={(e) => handleCancel()} type='button'>Cancelar</button>
        </form>
        </section>
        </div>
    )
}
export default GetIndicator
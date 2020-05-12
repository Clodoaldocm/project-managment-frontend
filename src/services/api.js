import axios from 'axios';

const api = axios.create({
    baseURL: 'https://iotarefas.herokuapp.com/',
})

export default api;

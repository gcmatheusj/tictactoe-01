import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tictactoe.api.01card.com.br',
});

export default api;

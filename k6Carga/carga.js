import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 200,  // 20.000 usuários virtuais simultâneos
  duration: '1m',  // duração do teste
  maxDuration: '5m',  // duração máxima do teste
};

export function setup() {
    const payload = JSON.stringify({
        Email: 'tiagoferraro@gmail.com',
        Senha: '123456',
    });
  
    const loginRes = http.post('http://localhost:8081/api/Autenticador/login', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  
    const token = loginRes.json('token'); // depende do retorno da sua API
    return { token };
  }
  
  export default function (data) {
    const headers = {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    };

    const payload = JSON.stringify({
        "pacienteId": "45f4f088-1f13-447c-bf2b-38c693981fa3",
        "DataInicial": "2025-04-10T13:00:00.000Z",
        "DataFinal": "2025-04-14T13:00:00.000Z"
      });
  
    const res = http.post('http://localhost:8082/api/Agendamento/obterporpaciente', payload, { headers });
  
    // console.log('Resposta da API:', res.json());
  
    check(res, {
      'status é 200': (r) => r.status === 200,
      'resposta em menos de 500ms': (r) => r.timings.duration < 500,
    });
  }
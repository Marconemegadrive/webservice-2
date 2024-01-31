// src/App.tsx
import React, { useState, useEffect } from 'react';
import api from './services/Api';

interface Tarefa {
  id: string;
  descricao: string;
}

const App: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState<string>('');

  useEffect(() => {
    api.get('/tarefas')
      .then(response => {
        setTarefas(response.data);
      });
  }, []);

  const handleAdicionarTarefa = async () => {
    if (!novaTarefa.trim()) return;
    
    const response = await api.post('/tarefas', {
      descricao: novaTarefa
    });

    setTarefas([...tarefas, response.data]);
    setNovaTarefa('');
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input type="text" value={novaTarefa} onChange={e => setNovaTarefa(e.target.value)} />
      <button onClick={handleAdicionarTarefa}>Adicionar</button>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>{tarefa.descricao}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;


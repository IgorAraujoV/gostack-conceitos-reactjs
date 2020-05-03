import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');
      
      setRepositories(response.data);
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const title = `Repositório ${repositories.length + 1}`;

    const response = await api.post('repositories', { title });
    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
          )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

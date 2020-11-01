import React, {useState, useEffect} from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: 'Repositório', 
      url: 'www.google.com',
      techs: ['Node', 'React']
    });

    setRepositories([...repositories, response.data]);
    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(rep => rep.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(rep => 
          <li key ={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
           </button>
          </li>
          )}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;


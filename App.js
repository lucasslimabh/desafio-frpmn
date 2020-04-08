import React, {useState, useEffect} from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    })},
  []);


  async function handleAddRepository() {
    const response  = await api.post('/repositories',{
      url : "http://hinova.com.br",
      title : `teste ${Date.now()}`,
      techs : ["maria madalena", "mambo number 5"]
    });

    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    if (response) {
      setProjects(projects.filter(project => project.id !== id))
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}>{project.title}
          <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import blogFetch from "../axios/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // função para buscar todos os usuários
  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/users");
      const data = response.data;
      // atualiza os usuários e usuários filtrados com os dados retornados pela API
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // função para filtrar usuários com base em um termo de pesquisa
  const filterUsers = (term) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // useEffect para buscar todos os usuários ao carregar a página
  useEffect(() => {
    getPosts();
  }, []);

  // useEffect para filtrar usuários quando o termo de pesquisa é atualizado
  useEffect(() => {
    filterUsers(searchTerm);
  }, [searchTerm]);

  // Componente que exibe uma lista de usuários e permite filtrá-los por nome.
  // Ao clicar em um usuário, redireciona para a página de detalhes do usuário.
  return (
    <div className="user">
      <h1>Usuários</h1>
      <h2>Clique no nome do usuário para acessar seus detalhes</h2>
      <input
        type="text"
        placeholder="Buscar usuário..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        filteredUsers.map((user) => (
          <div className="details" key={user.id}>
            {/* Link para acessar os detalhes do usuário */}
            <Link className="btn" to={`/users/${user.id}`}>
              {user.name}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;

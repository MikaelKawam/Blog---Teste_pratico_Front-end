import blogFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserDetails.css";

// Componente UserDetails
const UserDetails = () => {
  // Obtenção do id a partir dos parâmetros da URL
  const { id } = useParams();

  // Definição do estado inicial do usuário e da mensagem de erro
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Função para obter os detalhes do usuário
  const getUserDetails = async () => {
    try {
      const response = await blogFetch.get(`/users/${id}`);
      const data = response.data;
      setUser(data);
    } catch (error) {
      setError("Usuário não encontrado");
    }
  };

  // Efeito para obter os detalhes do usuário sempre que o id mudar
  useEffect(() => {
    getUserDetails();
  }, [id]);

  // Renderização condicional em caso de erro
  if (error) {
    return <p>{error}</p>;
  }

  // Renderização condicional enquanto os detalhes do usuário são carregados
  return (
    <div className="user-details">
      {!user ? (
        <p>Carregando...</p>
      ) : (
        <div className="user">
          <h2>{user.name}</h2>
          <p>{user.id}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <h2>Address</h2>
          <p>{user.address.street}</p>
          <p>{user.address.suite}</p>
          <p>{user.address.city}</p>
          <p>{user.address.zipcode}</p>
          <h2>Geo</h2>
          <p>{user.address.geo.lat}</p>
          <p>{user.address.geo.lng}</p>
          <h2>Contato</h2>
          <p>{user.phone}</p>
          <p>{user.website}</p>
          <h2>Company</h2>
          <p>{user.company.name}</p>
          <p>{user.company.catchPhrase}</p>
          <p>{user.company.bs}</p>
        </div>
      )}
    </div>
  );
};


export default UserDetails;

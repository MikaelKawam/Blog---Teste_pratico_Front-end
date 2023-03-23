import blogFetch from "../axios/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import axios from "axios";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // funçãoque obtém a lista de posts da API
  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/posts");
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // função que exclui um post da API
  const deletePost = async (id) => {
    await blogFetch.delete(`/posts/${id}`);
    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
  };

  // hook que executa a função getPosts()
  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Controle dos posts
  // Obs: Nesse caso a API não salva dados, somente é possível testar requisições.
  return (
    <div className="admin">
      <h1>Gerenciar posts</h1>
      <div>
        <input
          type="text"
          placeholder="Pesquisar por título..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <h3>
        Obs: Nesse caso a API não salva dados, somente é possível testar
        requisições.
      </h3>
      {filteredPosts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        filteredPosts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <div className="actions">
              <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>
                Editar
              </Link>
              <button
                className="btn delete-btn"
                onClick={() => deletePost(post.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;

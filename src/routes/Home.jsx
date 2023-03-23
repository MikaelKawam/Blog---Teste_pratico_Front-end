import blogFetch from "../axios/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Função para obter os posts da API
  const getPosts = async () => {
    try {
      // Requisição GET para a rota '/posts' usando o módulo 'blogFetch'
      const response = await blogFetch.get("/posts");
      // Extração dos dados da resposta e atualização do estado 'posts'
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hook para executar a função 'getPosts' somente uma vez, ao montar o componente
  useEffect(() => {
    getPosts();
  }, []);

  // Função para atualizar o estado 'searchTerm' com o valor do campo de pesquisa
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtro dos posts com base no termo de pesquisa
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Renderização do componente
  return (
    <div className="home">
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Pesquisar posts..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredPosts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        // Mapeamento dos posts filtrados para renderização individual de cada post
        filteredPosts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>{post.userId}</p>
            {/* Link para a página de comentários do post individual  */}
            <Link className="btn" to={`/posts/${post.id}/comments`}>
              Ver comentários
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

import blogFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Comments.css";

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Função para buscar os comentários do post a partir da API
  const fetchComments = async () => {
    try {
      // Faz uma requisição GET para a API do blog para obter os comentários do post com o ID especificado
      const response = await blogFetch.get(`/posts/${id}/comments`);
      // Define o estado
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      // Define o estado de erro
      setError("Ocorreu um erro ao recuperar os comentários.");
      setLoading(false);
    }
  };

  // Buscar os comentários do post
  useEffect(() => {
    fetchComments();
  }, []);

  // Verifica se a página ainda está carregando os comentários
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Verifica se ocorreu um erro na busca dos comentários
  if (error) {
    return <p>{error}</p>;
  }

  // Retorna o conteúdo dos comentários
  return (
    <div className="comment">
      {comments.map((comment) => (
        <div className="comment-details" key={comment.id}>
          <h2>{comment.name}</h2>
          <p>{comment.email}</p>
          <p>{comment.body}</p>
          <p>{comment.postId}</p>
          <p>{comment.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;

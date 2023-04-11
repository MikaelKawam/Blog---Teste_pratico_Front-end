import blogFetch from "../axios/config";

import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import "./EditPost.css";

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const { id } = useParams();

  // Função que busca as informações do post a ser editado
  const setPosts = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);

      const data = response.data;

      console.log(data);

      setTitle(data.title);
      setBody(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  // Função que envia as informações editadas para o servidor
  const editPost = async (e) => {
    e.preventDefault();

    // Cria um objeto com as informações editadas do post
    const post = { title, body, userId: 1 };
    // Faz uma requisição PUT para atualizar o post no servidor
    await blogFetch.put(`/posts/${id}`, {
      body: post,
    });

    navigate("/");
  };
  // Hook useEffect que executa a função setPosts
  useEffect(() => {
    setPosts();
  }, []);

  // Renderiza um formulário para editar o post
  // Obs: Nesse caso a API não salva dados, somente é possível testar requisições.
  return (
    <div className="edit-post">
      <h2>Editando: {title}</h2>
      <form onSubmit={(e) => editPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>
        <div className="form-control">
          <label htmlFor="title">Texto:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo..."
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
          ></textarea>
        </div>
        <input type="submit" value="Editar Post" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;

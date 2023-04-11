import blogFetch from "../axios/config";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./NewPost.css";
// Constante que recebe o hook 
const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  // Função para criar um novo post
  // Obs: Nesse caso a API não salva dados, somente é possível testar requisições.
  const createPost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await blogFetch.post("/posts", {
      body: post,
    });

    navigate("/");
  };

  // Formulário para inserir novo post
  return (
    <div className="new-post">
      <h2>Inserir novo Post:</h2>
      <h3>
        Obs: Nesse caso a API não salva dados, somente é possível testar
        requisições.
      </h3>
      <form onSubmit={(e) => createPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="title">Texto:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo..."
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Criar Post" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;

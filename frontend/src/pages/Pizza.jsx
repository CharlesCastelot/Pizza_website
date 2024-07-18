import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import "./Pizza.css";

function Pizza() {
  const [searchParams] = useSearchParams();
  const pizzaId = searchParams.get('pizza_id');
  const pizza = pizzaId;

  const [focusedPizza, setFocusedPizza] = useState(null);
  const [pizzaComments, setPizzaComments] = useState([]);
  const [creatingComment, setCreatingComment] = useState(false);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pizzaResponse = await api.get(`/api/pizza/${pizzaId}/`);
        setFocusedPizza(pizzaResponse.data);

        const commentsResponse = await api.get(`/api/pizza/${pizzaId}/comments/`);
        setPizzaComments(commentsResponse.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, [pizzaId]);

  if (!focusedPizza) {
    return <div>Loading...</div>;
  }

  const createComment = async () => {
    if (creatingComment) {
      try {
        await api.post(`/api/create-comment/${pizzaId}/`, { username, comment, pizza });
        setUsername("");
        setComment("");
        const commentsResponse = await api.get(`/api/pizza/${pizzaId}/comments/`);
        setPizzaComments(commentsResponse.data);
      } catch (error) {
        alert(error);
      }
      setCreatingComment(false);
    } else {
      setCreatingComment(true);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const cancelCommentCreation = () => {
    setCreatingComment(false);
    setUsername("");
    setComment("");
  };

  return (
    <div>
      <h1>{focusedPizza[0].pizza_name}</h1>
      <p>{focusedPizza[0].instructions}</p>
      <h2>Comments:</h2>
      <div className="comments-all">
        {pizzaComments.map((comment) => (
          <div key={comment.id} className="comments-one">
            <h3>{comment.username}</h3>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
      {creatingComment ? (
        <div className="comment-creation">
          <input
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <p/>
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={handleCommentChange}
          />
          <p/>
          <button onClick={createComment}>Post Comment</button>
          <button onClick={cancelCommentCreation}>Cancel</button>
        </div>
      ) : (
        <button onClick={createComment} className="comment-creation">Create Comment</button>
      )}
    </div>
  );
}

export default Pizza;

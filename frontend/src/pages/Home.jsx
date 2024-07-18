import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import api from "../api";
import "./Home.css"

function Home() {
    const navigate = useNavigate();
    const [pizzas, setPizzas] = useState([]);
    const [pizza_name, setPizza_name] = useState("");
    const [instructions, setInstructions] = useState("");
    const [creatingPizza, setCreatingPizza] = useState(false);

    useEffect(() => {
        getPizzas();
    }, []);

    const getPizzas = () => {
        api
            .get("/api/pizza/")
            .then((res) => res.data)
            .then((data) => {
                setPizzas(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const handleButton  = (pizzaID) => {
        console.log(pizzaID)
        navigate("/pizza?pizza_id="+pizzaID)
    }

    const createPizza = async () => {
        if (creatingPizza) {
          try {
            await api.post('/api/create-pizza/', { pizza_name, instructions });
            setPizza_name("");
            setInstructions("");
            const pizzasResponse = await api.get('/api/pizza/');
            setPizzas(pizzasResponse.data);
          } catch (error) {
            alert(error);
          }
          setCreatingPizza(false);
        } else {
          setCreatingPizza(true);
        }
    };
    const handlePizzaNameChange = (e) => {
        setPizza_name(e.target.value);
    };

    const handleInstructionsChange = (e) => {
        setInstructions(e.target.value);
    };

    const cancelPizzaCreation = () => {
        setCreatingPizza(false);
        setPizza_name("");
        setInstructions("");
    };

    return (
        <>
        <div className="content-container">
            {pizzas.map((pizza_id, idx) => (
                <button key={idx} className="pizza-box" onClick={() => handleButton(pizza_id.id)}>
                    <h1>{pizza_id.pizza_name}</h1>
                    <p>{pizza_id.instructions}</p>
                </button>
            ))}
        </div>

        {creatingPizza ? (
        <div className="pizza-creation">
          <input
            placeholder="Pizza Name"
            value={pizza_name}
            onChange={handlePizzaNameChange}
          />
          <p/>
          <textarea
            placeholder="Type Instructions"
            value={instructions}
            onChange={handleInstructionsChange}
          />
          <p/>
          <button onClick={createPizza}>Post Pizza</button>
          <button onClick={cancelPizzaCreation}>Cancel</button>
        </div>
      ) : (
        <button onClick={createPizza} className="pizza-creation">Create Pizza</button>
      )}
        </>
    )
}

export default Home
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BotCollection.css'; 

function BotCollection({ botsArray, setBotsArray, favouriteBots, setFavouriteBots }) {
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchData = async () => {
      if (!botsArray.length) {
        setLoading(true);
        try {
          const response = await fetch("https://bot-data-1lv2.onrender.com/bots");
          const data = await response.json();
          setBotsArray(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [botsArray, setBotsArray]);

  function addToFavoritesHandler(event) {
    const botId = parseInt(event.target.id);
    const draftedBot = botsArray.find((bot) => bot.id === botId);
    if (draftedBot && !favouriteBots.some((bot) => bot.id === botId)) {
      setFavouriteBots((prev) => [...prev, draftedBot]);
    } else {
      console.log('Already in favorites or bot not found');
    }
  }

  function navigateToDetails(id) {
    navigate(`/details/${id}`);
  }

  async function deleteBot(botToDelete) {
    try {
      const url = `https://bot-data-1lv2.onrender.com/bots/${botToDelete.id}`;
      const method = { method: 'DELETE' };

      await fetch(url, method);
      setBotsArray((prev) => prev.filter((bot) => bot.id !== botToDelete.id));
    } catch (error) {
      console.error('Error deleting bot:', error);
    }
  }

  const botCards = botsArray.map((bot) => (
    <div className='bot-card' key={bot.id}>
      <div className='card'>
        <img src={bot.avatar_url} className='card-img-top' alt='Loading...' />
        <div className='card-body'>
          <h3 className='card-title'>{bot.name}</h3>
          <p className='card-text'>{bot.catchphrase}</p>
          <h4>
            &#128147;{bot.health} &#128737;{bot.armor} &#9889;{bot.damage}
          </h4>
          <button onClick={addToFavoritesHandler} className='btn btn-info' id={bot.id}>
            Enlist
          </button>
          <button onClick={() => navigateToDetails(bot.id)} className='btn btn-primary' id={bot.id}>
            Details
          </button>
          <button onClick={() => deleteBot(bot)} className='btn btn-danger' id={bot.id}>
            X
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='bot-collection-container'>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        botCards
      )}
    </div>
  );
}

export default BotCollection;

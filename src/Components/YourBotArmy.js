import React from 'react';
import styles from './YourBotArmy.css'; 

function YourBotArmy({ favouriteBots, setFavouriteBots }) {
  function dischargeBot(event) {
    const botId = parseInt(event.target.id);
    const dischargeArray = favouriteBots.filter((fav) => fav.id !== botId);
    setFavouriteBots(dischargeArray);
  }

  function deleteBot(botToDelete) {
    const deleteArray = favouriteBots.filter((fav) => botToDelete.id !== fav.id);
    console.log(botToDelete.id);
    deleteMethod(botToDelete).then(() => {
      setFavouriteBots(deleteArray);
    });
  }

  function deleteMethod(bot) {
    const url = `https://bot-data-1lv2.onrender.com/bots/${bot.id}`;
    const method = {
      method: 'DELETE',
    };
    return fetch(url, method).then((data) => data);
  }

  const favouriteList = favouriteBots.map((fav) => (
    fav ? ( 
      <div className={`${styles.card} col-3 bg-info`} key={fav.id}>
        <img src={fav.avatar_url} className="card-img-top" alt={`Avatar of ${fav.name}`} />
        <div className="card-body">
          <h3 className="card-title">{fav.name}</h3>
          <p className="card-text">{fav.catchphrase}</p>
          <h4>Health:{fav.health} </h4>
          <h4>Armor:{fav.armor} </h4>
          <h4>Damage:{fav.damage}</h4>
          <button onClick={dischargeBot} className="btn btn-success" id={fav.id}>
            Delist
          </button>
          <button onClick={() => deleteBot(fav)} className="btn btn-danger">
            X
          </button>
        </div>
      </div>
    ) : null
  ));

  return (
    <div className={`col-12 border border-primary ${styles.bgWarning}`}>
      <h2>Your Bot Army</h2>
      <div className="row">{favouriteList}</div>
    </div>
  );
}

export default YourBotArmy;

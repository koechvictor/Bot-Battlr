import React from "react";
import BotCard from "./BotCard";
function YourBotArmy({ bots, action, removeCard }) {

    return (
        <>
            <div className="ui segment inverted olive bot-army">
                <h1>Enlisted Army</h1>
                <div className="ui five column grid">
                    <div className="row bot-army-row">
                        {bots && bots.map((bot) => {
                            return <BotCard key={bot.id} bot={bot} action={action} removeCard={removeCard} />
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default YourBotArmy;

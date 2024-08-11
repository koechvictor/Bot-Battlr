import React from "react";
import BotCard from "./BotCard";

function BotCollection() {
    return (
        <div className="ui four column grid">
            <div className="row">
                {botCollection && botCollection.map((bot) => {
                    return <BotCard />
                })}
            </div>
        </div>
    );
}

export default BotCollection;

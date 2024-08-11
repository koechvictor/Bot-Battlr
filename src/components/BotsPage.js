import React, { useState, useEffect } from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";
import BotSpecs from "../components/BotSpecs";

function BotsPage() {
    const [botCollection, setBotCollection] = useState([]);
    const [filteredCollection, setFilteredCollection] = useState([]);
    const [botArmy, setBotArmy] = useState([]);
    const [collectionVisible, setCollectionVisible] = useState(true);
    const [botSpecs, setBotSpecs] = useState({});

    useEffect(() => {
        fetch("https://bot-battlr-server-sowp.onrender.com/bots")
            .then((res) => res.json())
            .then((bots) => {
                setBotCollection(bots);
                setFilteredCollection(bots);
            });
    }, []);

    function addToArmy(bot) {
        const newCollection = filteredCollection.filter(
            (card) => card.bot_class !== bot.bot_class
        );
        setFilteredCollection(newCollection);
        setBotArmy([...botArmy, bot]);
        setCollectionVisible(true);
    };

    function removeFromArmy(bot) {
        const newArmy = botArmy.filter((card) => card.id !== bot.id);
        const armyClasses = newArmy.map((bot) => bot.bot_class);
        const newCollection = botCollection.filter(
            (bot) => !armyClasses.includes(bot.bot_class)
        );
        setBotArmy(newArmy);
        setFilteredCollection(newCollection);
    };

    function deleteBot(bot) {
        const newCollection = botCollection.filter((card) => card !== bot);
        const newFilteredCollection = filteredCollection.filter(
            (card) => card !== bot
        );
        const newArmy = botArmy.filter((card) => card !== bot);
        setBotCollection(newCollection);
        setFilteredCollection(newFilteredCollection);
        setBotArmy(newArmy);

        fetch(`https://bot-battlr-server-sowp.onrender.com/bots/${bot.id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => alert("bot deleted successfully!"));
    };

    function displayBotSpecs(bot) {
        setCollectionVisible(false);
        setBotSpecs(bot);
    };

    function botsCollection() {
        setCollectionVisible(true);
    };

    return (
        <div>
            <YourBotArmy bots={botArmy} action={removeFromArmy} removeCard={deleteBot} />
            {collectionVisible ? (
                <BotCollection
                    botCollection={filteredCollection}
                    action={displayBotSpecs}
                    removeCard={deleteBot} />
            ) : (
                <BotSpecs bot={botSpecs} back={botsCollection} enlist={addToArmy} />
            )}
        </div>
    );
};

export default BotsPage;

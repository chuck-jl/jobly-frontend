import React from "react";
import Card from "./Card";

const CardList = ({cards=[], apply = ()=>null}) =>{
    return cards.length ? (
        <div className="CardList">
            {cards.map((card,idx)=>
            (
                <Card
                  item={card}
                  key={idx}
                  idx={idx}
                  apply={apply}
                />
            )
            )}
        </div>
    ) : (
        <p className="lead">No result found!</p>
    )
}

export default CardList
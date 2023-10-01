import React from "react";

export default function Summary({portfolio}) {
    return (
        portfolio.map((stock,index) => {
            return <p key = {index}> Stock: {stock.ticker} Shares: {stock.shares} Purchase Price: {stock.initialPrice} </p>
        } )
    );

}
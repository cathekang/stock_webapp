import React from "react";

export default function Summary({people})
{
    return (
        <>
        {
            people.map( (person,index) => {
                return (
                    <div key = {index}>
                    <p> Person name: {person.name} </p>
                    Stocks:
                        <>
                            {
                                person.stocks.map( (stock,index) => {
                                    return (
                                        <div key = {index} >
                                        <span> {stock.ticker}</span>
                                        <span> {stock.shares} </span>
                                        </div>
                                    )
                                })
                            }
                        </>
                    <p> Portfolio Value: {person.value} </p>
                    </div>
                )
            } )
        }
        </>
    );

}
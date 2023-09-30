from fastapi import FastAPI, Request
from typing import List
from pydantic import BaseModel
import yfinance as yf
import numpy as np

app = FastAPI()

class Stock(BaseModel):
    ticker: str
    shares: float
    
    def value(self):
        price = yf.Ticker(self.ticker).info['currentPrice']
        print(price)
        return float(price) * self.shares

class Portfolio(BaseModel):
    name: str
    stocks: List[Stock] = []
    value: float

    def get_value(self):
        total = 0
        for stock in self.stocks:
            total += stock.value()
        return total
        
DB: List[Portfolio] = [
    Portfolio(name= "Catherine", stocks= [Stock(ticker ="AAPL", shares = 2.0), Stock(ticker="BAC", shares = 17.5)], value = 0),
    Portfolio(name= "Kimberly", stocks= [Stock(ticker ="AAPL", shares = 2.0)], value = 0),
    Portfolio(name= "Cheryl", stocks= [Stock(ticker ="AAPL", shares = 2.0)], value = 0)
]

test = Portfolio(name= "Catherine", stocks= [Stock(ticker ="AAPL", shares = 2.0), Stock(ticker="BAC", shares = 17.5)], value = 0)


@app.get("/api")
def read_root():
    return DB

@app.get("/get_portfolio_value")
async def get_portfolio_value():
    total = test.get_value()
    return {
        "success": True,
        "data": total,
        "message": "successfuly got portfolio value"
    }

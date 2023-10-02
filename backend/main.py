from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import yfinance as yf
import numpy as np

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Data(BaseModel):
    ticker: str
    shares: float
class Stock(BaseModel):
    ticker: str
    company: str
    shares: float
    price_at_purchase: float

#Dictionary holding ticker, number of shares, 
portfolio: List[Stock] = []
transactions: List[Stock] = []

@app.post("/buy")
async def buy_stocks(data: Data):
    ticker = data.ticker
    shares = data.shares
    
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
    except:
        raise HTTPException(status_code=422, detail = "Invalid ticker")

    #Error Handling
    if shares < 0:
        raise HTTPException(status_code=422, detail = "Invalid amount of shares")
    
    found = False
    for stocks in portfolio:
        if stocks.ticker == ticker:
            stocks.price_at_purchase =  (info['currentPrice'] * shares + stocks.shares * stocks.price_at_purchase)/2
            stocks.shares +=  shares
            found = True
    if not found:
        new_stock = Stock(ticker = ticker, company = info['longName'], shares = shares, price_at_purchase=info['currentPrice'])
        portfolio.append(new_stock)
    
    transactions.append((Stock(ticker = ticker, company = info['longName'], shares = shares, price_at_purchase=info['currentPrice'])))
    
    return {
        "success" : True,
        "data" : portfolio,
        "message": "buy_stocks successful"
    }

@app.post("/sell")
def sell_stocks(data: Data):
    ticker = data.ticker
    shares = data.shares
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
    except:
        raise HTTPException(status_code=422, detail = "Invalid ticker")

    found = False
    for stock in portfolio:
        if stock.ticker == ticker:
            if shares > stock.shares:
                raise HTTPException(status_code=422, detail = "Invalid amount of shares")
            elif shares == stock.shares:
                portfolio.remove(Stock(ticker = ticker, shares = shares, company = stock.company, price_at_purchase= stock.price_at_purchase))
            stock.shares -= shares
            found = True

    if not found:
        raise HTTPException(status_code=404, detail = "Stock does not exist in your portfolio")
    transactions.append((Stock(ticker = ticker, company = info['longName'], shares = -shares, price_at_purchase=info['currentPrice'])))
    return {
        "success" : True,
        "data" : portfolio,
        "message": "sell_stocks successful"
    }

@app.get("/portfolio")
def get_portfolio():
    return portfolio

@app.get("/transactions")
def get_transactions():
    return transactions

@app.get("/get_portfolio_cost")
def get_portfolio_cost():
    total = 0
    for stock in portfolio:
        total += stock.price_at_purchase * stock.shares
    
    return total

@app.get("/get_portfolio_value")
def get_portfolio_value():
    total = 0
    for stock in portfolio:
        price = yf.Ticker(stock.ticker).info['currentPrice']
        total += float(price) * stock.shares

    return total

@app.get("/get_abs_gain")
def get_abs_gain():
    absolute_gain = 0
    for stock in portfolio:
        cur_price = yf.Ticker(stock.ticker).info['currentPrice']
        absolute_gain += cur_price - stock.price_at_purchase

    return absolute_gain

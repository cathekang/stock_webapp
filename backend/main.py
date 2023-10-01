from fastapi import FastAPI, HTTPException
from typing import List, Dict
from pydantic import BaseModel
import yfinance as yf
import numpy as np

app = FastAPI()

class Stock(BaseModel):
    ticker: str
    company: str
    shares: float
    price_at_purchase: float

#Dictionary holding ticker, number of shares, 
portfolio: List[Stock] = [
    Stock(ticker="AAPL", company ="Apple", shares = 0, price_at_purchase= 0) 
]
transactions: List[Stock] = [
    Stock(ticker = "AAPL", company = "Apple", shares = 10, price_at_purchase = 271.3),
    Stock(ticker = "AAPL", company = "Apple", shares = 10, price_at_purchase = 271.3),
    Stock(ticker = "AAPL", company = "Apple", shares = 10, price_at_purchase = 271.3)
    
]

@app.post("/buy")
def buy_stocks(ticker: str, shares: float):
    stock = yf.Ticker(ticker)

    #Error Handling
    if stock.info['currentPrice'] == None:
        raise HTTPException(status_code=404, detail = "Ticker does not exist")
    if shares < 0:
        raise HTTPException(status_code=422, detail = "Invalid amount of shares")
    
    found = False
    for stocks in portfolio:
        if stocks.ticker == ticker:
            stocks.shares +=  shares
            found = True
    if not found:
        new_stock = Stock(ticker = ticker, company = stock.info['longName'], shares = shares, price_at_purchase=stock.info['currentPrice'])
        portfolio.append(new_stock)
    
    transactions.append((Stock(ticker = ticker, company = stock.info['longName'], shares = shares, price_at_purchase=stock.info['currentPrice'])))
    
    return {
        "success" : True,
        "data" : portfolio,
        "message": "buy_stocks successful"
    }

@app.post("/sell")
def sell_stocks(ticker:str, shares:float):
    found = False
    for stock in portfolio:
        if stock.ticker == ticker:
            if shares > stock.shares:
                raise HTTPException(status_code=422, detail = "Invalid amount of shares")
            stock.shares -= shares
            found = True

    if not found:
        raise HTTPException(status_code=404, detail = "Stock does not exist in your portfolio")
    transactions.append((Stock(ticker = ticker, company = stock.info['longName'], shares = -shares, price_at_purchase=stock.info['currentPrice'])))
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

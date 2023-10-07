from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import yfinance as yf
from datetime import datetime as dt

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

class TransactionData(BaseModel):
    ticker: str
    shares: float
class CandlestickData(BaseModel):
    ticker:str
class Stock(BaseModel):
    ticker: str
    company: str
    shares: float
    price_at_purchase: float


portfolio: List[Stock] = [
    Stock(ticker = "LULU", company="Lululemon Athletica Inc.", shares = 15, 
          price_at_purchase=382.86),
    Stock(ticker = "AAPL", company="Apple Inc.", shares=10,
          price_at_purchase=173.75),
    Stock(ticker="BAC", company = "Bank of American Copopration", shares = 12.5,
          price_at_purchase = 26.70),
    Stock(ticker="DIS", company="The Walt Disney Company", shares = 8,
          price_at_purchase=81.67)
]
transactions: List[Stock] = []
app.candlestick_stock = "LULU"

@app.post("/buy")
async def buy_stocks(data: TransactionData):
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
def sell_stocks(data: TransactionData):
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
@app.post("/candlestick_stock")
def pick_candlestick_stock(data: CandlestickData):
    try:
        stock = yf.Ticker(data.ticker)
        info = stock.info
    except:
        raise HTTPException(status_code=422, detail = "Invalid ticker")
    
    app.candlestick_stock = data.ticker
    return {
        "success": True,
        "data": app.candlestick_stock,
        "message": "pick_candlestick_stock successful"
    }

@app.get("/portfolio")
def get_portfolio():
    return portfolio

@app.get("/transactions")
def get_transactions():
    return transactions

@app.get("/symbol")
def get_symbol():
    print(app.candlestick_stock)
    return app.candlestick_stock

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

@app.get("/get_gain_percent")
def get_gain_percent():
    curr_portfolio_value = get_portfolio_value()
    initial_portfolio_value = 0
    for stock in portfolio:
        initial_portfolio_value += stock.price_at_purchase * stock.shares

    if initial_portfolio_value == 0:
        initial_portfolio_value = 1
    gain_percent = (curr_portfolio_value - initial_portfolio_value)/initial_portfolio_value
    return gain_percent

@app.get("/get_candlestick_data")
def get_candlestick_data():
    candlestick_data = []
    start_date = '2023-01-01'
    end_date = dt.now().strftime('%Y-%m-%d')
    print(app.candlestick_stock)
    df = yf.download(app.candlestick_stock, start_date, end_date, interval="1d")
    df.reset_index(inplace = True)
    for i in range(len(df)):
        candlestick_data.append([df.iloc[i]['Date'], [
                            df.iloc[i]['Open'],
                            df.iloc[i]['High'],
                            df.iloc[i]['Low'],
                            df.iloc[i]['Close']
                            ]]
                        )
    return candlestick_data
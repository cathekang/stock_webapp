

import psycopg2
import yfinance as yf
import numpy as np
from psycopg2.extensions import register_adapter, AsIs
psycopg2.extensions.register_adapter(np.int64, psycopg2._psycopg.AsIs)

ticker = 'AAPL'
START = '2023-1-1'
END = '2023-9-1'
stock_data = yf.download(ticker, start = START, end = END)
stock_data.index = np.datetime_as_string(stock_data.index, unit = 'D')
stock_data['Ticker'] = ticker
stock_data = stock_data.rename(columns={'Adj Close': 'Adj_Close'})
records = stock_data.to_records(index=True)
#Create database
conn = psycopg2.connect(
    database = 'postgres', user='postgres', password='postgres', host='127.0.0.1', port='5433'
)
conn.autocommit = True
cur = conn.cursor()
sql = '''CREATE DATABASE stockportfolio'''
cur.execute(sql)
print("Database created succesfully!")
cur.close()
conn.close()

#Create table in database
conn = psycopg2.connect(
    database = 'stockportfolio', user='postgres', password='postgres', host='127.0.0.1', port='5433'
)
conn.autocommit = True
cur= conn.cursor()
cur.execute(''' CREATE TABLE user
                (
                    Name VARCHAR(255) NOT NULL,
                    Stocks ARRAY[] NOT NULL,
                    Value FLOAT NOT NULL
                );
            ''')
print("Table created successfully!")
cur.close()
conn.close()


query = '''INSERT INTO prices (Date, Open, High, Low, Close, Adj_Close, Volume, Ticker)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s)'''
cursor.executemany(query, records)
conn.close()
print("Data insert successfully")
conn.close()


conn = psycopg2.connect(
    database = 'stocks', user='postgres', password='postgres', host='127.0.0.1', port='5433'
)
conn.autocommit = True
cursor = conn.cursor()
cursor.execute('SELECT * from prices LIMIT 5')
rows = cursor.fetchall()
for row in rows:
    print(row)
    print("Query done sucessfully")
conn.close()
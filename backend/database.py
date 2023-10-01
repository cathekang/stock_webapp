

import psycopg2
import numpy as np
from psycopg2.extensions import register_adapter, AsIs
psycopg2.extensions.register_adapter(np.int64, psycopg2._psycopg.AsIs)


#Create database
conn = psycopg2.connect(
    database = 'postgres', user='postgres', password='postgres', host='127.0.0.1', port='5433'
)
conn.autocommit = True
cur = conn.cursor()
sql = '''CREATE DATABASE portfolio'''
cur.execute(sql)
print("Database created succesfully!")
cur.close()
conn.close()

#Create table in database
conn = psycopg2.connect(
    database = 'portfolio', user='postgres', password='postgres', host='127.0.0.1', port='5433'
)
conn.autocommit = True
cur= conn.cursor()
cur.execute(''' CREATE TABLE stock
                (
                    Ticker VARCHAR(255) NOT NULL,
                    Company VARCHAR(255) NOT NULL,
                    Price FLOAT NOT NULL,
                    Shares FLOAT NOT NULL
                );
            ''')
print("Table created successfully!")
cur.close()
conn.close()



'''conn = psycopg2.connect(
    database = 'portfolio', user='postgres', password='postgres', host='127.0.0.1', port='5433'
)
conn.autocommit = True
cursor = conn.cursor()
cursor.execute('SELECT * from prices LIMIT 5')
rows = cursor.fetchall()
for row in rows:
    print(row)
    print("Query done sucessfully")
conn.close()'''
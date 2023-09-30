import requests

from collections import defaultdict
from datetime import datetime
import psycopg2
from flask import Flask, request, jsonify


app = Flask(__name__)


def get_db_connection():
    conn = psycopg2.connect( database = 'stocks', user='postgres', password='postgres', host='127.0.0.1', port='5433')
    return conn

@app.route("/")
def testing():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM prices LIMIT 10;')
    rows = cur.fetchall()
    for row in rows:
        print(row)
    cur.close()
    conn.close()
    return "Query done sucessfully" 

app.run(debug=True, port = 5000)
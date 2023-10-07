
**Installation:**

After pulling the code from Github, open the terminal. 

For the backend, there are two installations. In the terminal, type:

`pip install fastapi`

`pip install “uvicorn[standard]”`

For the frontend, there are several installations:

`pip install yfinance`

`npm i axios`

`npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`

`npm install cors`

`npm i react-apexcharts apexcharts bootstrap –legacy-peer-deps`


**To run:**

For the backend:

1. cd backend
2. Type `uvicorn main:app --reload` (If that doesn’t work, try `python -m uvicorn main:app --reload`)

For the frontend:

1. Open new terminal
2.  cd frontend
3.  Type `npm start`


**2nd Option:**
If one has Dockers Desktop, one can run it by:

For the backend:
1. cd backend
2. Type `docker network create stock_webapp`
3. Type `docker run --name backend --rm --network stock_webapp -p 8000:8000 backend`

For the frontend:
1. Open another terminal
2. cd frontend
3. Type `docker run --rm --name frontend --network stock_webapp -p 3000:3000 frontend`

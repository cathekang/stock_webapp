FROM python:3.10
WORKDIR /api
COPY ./requirements.txt /api/requirements.txt
RUN pip install -r /api/requirements.txt
COPY . /api
ENTRYPOINT [ "uvicorn", "main:app", "--host" , "0.0.0.0", "--port", "8000" ]
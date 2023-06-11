FROM python:3
WORKDIR /usr/src

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY src/. .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.10.0/wait /wait
RUN chmod +x /wait

CMD /wait && python3 -u main.py
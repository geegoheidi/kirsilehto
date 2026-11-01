#!/bin/bash
# Avaa seminaarisivut paikallisesti: tuplaklikkaa tätä tiedostoa Finderissa.
# Etsii ensimmäisen vapaan portin alkaen 5000 ja avaa sivut selaimeen. Pysäytä: Ctrl+C tai sulje ikkuna.
cd "$(dirname "$0")"
PORT=$(python3 -c '
import socket
for p in range(5000,5100):
    s=socket.socket()
    try:
        s.bind(("",p)); s.close(); print(p); break
    except OSError: pass
')
echo "$PORT" > .portti
echo "Seminaarisivut: http://127.0.0.1:$PORT/"
( sleep 1; open "http://127.0.0.1:$PORT/" ) &
python3 -m http.server "$PORT" --bind 127.0.0.1

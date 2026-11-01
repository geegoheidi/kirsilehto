#!/bin/bash
# Avaa seminaarisivut paikallisesti: tuplaklikkaa tätä tiedostoa Finderissa.
# Etsii ensimmäisen vapaan portin alkaen 5000. Siistit osoitteet toimivat kuten Netlifyssä (/puolustus = puolustus.html).
# Pysäytä: Ctrl+C tai sulje ikkuna.
cd "$(dirname "$0")"
python3 - <<'PY'
import http.server, os, socket, socketserver, subprocess, threading
class H(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        p = self.path.split('?')[0].split('#')[0]
        if p != '/' and not os.path.splitext(p)[1] and os.path.exists('.' + p + '.html'):
            self.path = p + '.html' + self.path[len(p):]
        return super().send_head()
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
def free(p):
    s = socket.socket()
    try:
        s.bind(('', p)); return True
    except OSError:
        return False
    finally:
        s.close()
port = next(p for p in range(5000, 5100) if free(p))
open('.portti', 'w').write(str(port))
url = f'http://127.0.0.1:{port}/'
print('Seminaarisivut:', url)
threading.Timer(1, lambda: subprocess.run(['open', url])).start()
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('127.0.0.1', port), H) as s:
    s.serve_forever()
PY

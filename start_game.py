"""Local-only server. No installation or network downloads required."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial
import argparse
import threading
import webbrowser

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=8765)
parser.add_argument('--open', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent
url = f'http://127.0.0.1:{args.port}/'
try:
    server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(SimpleHTTPRequestHandler, directory=str(root)))
except OSError as error:
    raise SystemExit(f'Tidak dapat membuka server: {error}. Jika port sedang dipakai, jalankan dengan --port 8766.')
print(f'Daud & Goliat berjalan di {url}\nTekan Ctrl+C untuk berhenti.', flush=True)
if args.open:
    threading.Timer(.5, lambda: webbrowser.open(url)).start()
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()

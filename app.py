import os

import requests
from flask import *
from dotenv import load_dotenv


def get_external_ip():
    try:
        ip = requests.get('https://api.ipify.org').content.decode('utf8')
        return ip
    except:
        return "N/A"


load_dotenv(".env")


class Config:
    # Flask config
    DEBUG = bool(int(os.getenv("DEBUG", 0)))
    SERVER_NAME = os.getenv("SERVER_NAME")

    # vpn depended settings
    SERVER_PRIMARY_DNS = os.getenv("SERVER_PRIMARY_DNS", "N/A")

    # auto defined values
    SERVER_EXTERNAL_IP = os.getenv("SERVER_EXTERNAL_IP", get_external_ip())


app = Flask(__name__)
app.config.from_object(Config)


@app.route("/")
@app.route("/index")
def index():
    client_ip = request.headers.get("X-Real-IP")
    if not client_ip:
        client_ip = request.remote_addr
    return render_template("index.html",
                           server_ip=app.config.get("SERVER_EXTERNAL_IP", "N/A"),
                           client_ip=client_ip,
                           primary_dns=app.config.get("SERVER_PRIMARY_DNS", "N/A"))


if __name__ == '__main__':
    app.run("0.0.0.0", 5000, debug=True)


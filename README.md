# whats-my-aircraft

This repo contains a fully-dockerized RESTful API that allows drone recognition from a 640x640 image.

## Install

Simply clone the repo and launch the multiple containers locally to test the webapp
`git clone https://github.com/nicoboou/whats-my-aircraft.git`
`docker compose up`

## Usage

1. Access the web app on your local machine, accessible on the port 3000 via `localhost:3000`
2. Select a 640x640 image using the file selecter, upload the image & get instant detection result !

<img src="https://github.com/nicoboou/whats-my-aircraft/blob/master/whatsmydrone.gif" width="570" height="480"/>

## Stack

- **Backend:**
  - `uvicorn`: Asynchronous Server Gateway Interface web server; to bring common interface between Python web app and the Nginx web server
  - `nginx`: web server
  - `fastapi`: Python webframework to build RESTful API
- **Frontend:**
  - `React`: Javascript framework to build scalable web apps
- **AI model:**
  - YOLOv5: DL model trained & loaded using `torch`
- **Database**:
  - `postgres`: _implementation in coming_

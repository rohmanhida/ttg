# backend & front end app
this app uses/exposes these ports to run, if you already use these ports please change accordingly in `docker-compose.yml`
- 3306: mysql
- 3000: nestjs
- 80: vite

please add .env variables in both `ttg/` directory and `ttg-backend/` directory.
here's the example env for `ttg/` directory:
```
DB_ROOT_PASSWORD=pentolkanji
DB_NAME=ttg
DB_USER=hida
DB_PASSWORD=pentolkanji
DB_SYNC=true
UI=frontend
VITE_APP_URL=http://localhost:3000
```

and here's the example env for `ttg-backend/` directory:
```
UI=frontend
DB_USER=hida
DB_PASSWORD=rahasia
DB_NAME=ttg
DB_SYNC=true
DB_HOST=localhost
DB_PORT=3306
```

then run using this command
```
docker compose up -d --build
```

you can access the frontend through `http://localhost/`, and the backend through `http://localhost:3000`

# leetcode 1

to run this function you can run this command, please make sure you have python installed
```
python3 number3.py
```

# leetcode 2

to run this function you can run this command, please make sure you have python installed
```
python3 number4.py
```

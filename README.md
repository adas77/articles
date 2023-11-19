# Demo (working FE -> BE)


https://github.com/adas77/articles/assets/73692470/6cad7072-20e3-4995-85ae-5c0ec5158454


# Backend

Go to backend dir

```bash
cd connexion-example
```

Activate environment

```bash
python -m venv venv
```

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Init and seed db

```bash
python setup_db.py
```

Run server

```bash
flask run --reload
```

Visit [http://localhost:5000/api/ui/](http://localhost:5000/api/ui/)

# Frontend

Go to frontend dir

```bash
cd fe
```

Install dependencies

```bash
npm install
```

Start the app in development mode

```bash
quasar dev
```

or

```bash
npx quasar dev
```

Visit [http://localhost:8080/](http://localhost:8080/)

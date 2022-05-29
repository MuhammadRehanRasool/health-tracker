1. Change "server" and "client" links in "client\src\CONSTANT.js"
   server - backend(Django link)
   client - frontend(React link)

2. Change CORS_ALLOWED_ORIGINS in "project\settings.py" || line 82
   Add the frontend link in it

3. Change DATABASES in "project\settings.py" || line 110
'NAME': 'your database name',
'USER': 'database user's username',
'PASSWORD': 'database user's password',
'HOST': 'localhost',
'PORT': '3306',

______________________________________________________


A) Setup Backend

--> pip install -r requirements.txt
--> python manage.py makemigrations
--> python manage.py migrate
--> python manage.py runserver


A) Setup Frontend

--> npm i
--> npm run start
Server will run
--> npm run build (to build)
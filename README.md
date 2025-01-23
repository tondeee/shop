# 1. Налаштуйте середовище
$ yarn env create

# 2. Встановіть та запустіть фронтенд
$ yarn install
$ yarn start

# 3. Налаштуйте та запустіть бекенд
$ cd backend
$ pip install django djangorestframework corsheaders
$ python manage.py migrate shop
$ python manage.py runserver

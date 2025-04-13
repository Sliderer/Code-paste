import sys
sys.path.append('../')

import pytest
import time
import json
from selenium import webdriver
from utils import create_user, delete_user, get_user_metadata, create_resource_request, compress_data
from proxies.client_server_proxy import ClientServerProxy

frontend_address = 'http://localhost:3000'


class User:
    def __init__(self, user_name, user_id, email, password):
        self.user_name = user_name
        self.user_id = user_id
        self.email = email
        self.password = password


@pytest.fixture(scope="session", autouse=True)
def client_backend_proxy():
    return ClientServerProxy()


@pytest.fixture(scope="session", autouse=True)
def default_user(client_backend_proxy):
    name = 'default_user'
    password = 'Aa123456789'
    email = 'test@mail.ru'
    user_id = create_user(client_backend_proxy, name, email, password)
    return User(
        name,
        user_id,
        email,
        password
    )


@pytest.fixture(scope="session", autouse=True)
def create_data(client_backend_proxy, default_user):
    yield
    delete_user(client_backend_proxy, default_user.user_id, default_user.password)
    

@pytest.fixture(scope="session", autouse=True)
def user_deleter(client_backend_proxy):
    def delete(user):
        delete_user(client_backend_proxy, user.user_id, user.password)
    
    return delete


@pytest.fixture(scope="session", autouse=False)
def second_user():
    name = 'second_user'
    password = 'Aa12345678'
    email = 'test2@mail.ru'
    return User(
        name,
        None,
        email,
        password
    )


@pytest.fixture(scope="session", autouse=False)
def create_resource(client_backend_proxy, default_user):
    def create(text):
        compressed_value = compress_data(text)
        response = create_resource_request(client_backend_proxy, default_user.user_name, default_user.user_id, compressed_value, '')
        return response.text

    return create

@pytest.fixture(scope="session")
def get_user_id(client_backend_proxy):
    def handler(user_name):
        user_metadata = get_user_metadata(client_backend_proxy, user_name)
        return json.loads(user_metadata)['UserId']
        
    return handler


@pytest.fixture(scope="function", autouse=True)
def web_driver():
    def create_driver(page):
        driver = webdriver.Chrome()
        driver.get(f'{frontend_address}/{page}')
        time.sleep(2)
        return driver
    return create_driver

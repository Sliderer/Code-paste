import pytest
import json
from utils import create_user, update_contact, delete_user, user_auth, get_user_metadata


def test_user_functions(client_backend_proxy):
    user_name = 'username'
    password = '123456789'
    user_id = create_user(client_backend_proxy, user_name, 'test@mail.ru', password)
    session_id = user_auth(client_backend_proxy, user_name, password)
    
    update_contact(client_backend_proxy, user_id, 'telegram', 'tg', session_id)
    update_contact(client_backend_proxy, user_id, 'email', 'test2@mail.ru', session_id)

    user_metadata = get_user_metadata(client_backend_proxy, user_name)
    assert json.loads(user_metadata) == {'Email': 'test2@mail.ru', 'Telegram': 'tg', 'UserId': 'nCvnBHez0bKvXglb8_gwIA=='}
    
    logout = client_backend_proxy.send_request(
        method='get',
        uri='logout',
        cookies={
            'session_id': session_id
        }
    )
    assert logout.status_code == 200

    delete_user(client_backend_proxy, user_id, password)
    

def test_user_dublicate(client_backend_proxy):
    user_name = 'username'
    password = '123456789'
    email = 'test@mail.ru'
    user_id = create_user(client_backend_proxy, user_name, email, password)
    
    register_response = client_backend_proxy.send_request(
        'post',
        'create_user',
        {
            'UserName': user_name,
            'Email': email,
            'Password': password
        }
    )
    assert register_response.status_code == 404
    
    delete_user(client_backend_proxy, user_id, password)
    
    
def test_not_existing_user(client_backend_proxy):
    user_name = 'username'
    password = '123456789'
    
    enter_response = client_backend_proxy.send_request(
        'post',
        'auth',
        {
            'UserName': user_name,
            'Password': password
        }
    )
    assert enter_response.status_code == 200
    response = json.loads(enter_response.text)
    assert not response['Result']
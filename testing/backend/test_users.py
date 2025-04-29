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
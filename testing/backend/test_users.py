import pytest
import json


def update_contact(client_backend_proxy, user_id, field, value, session_id):
    update_contacts = client_backend_proxy.send_request(
        method='post',
        uri='update_user_contacts',
        json={
            'UserId': user_id,
            'Field': field,
            'Value': value
        },
        cookies={
            'session_id': session_id
        }
    )
    assert update_contacts.status_code == 200
    

def create_user(client_backend_proxy, user_name, email, password):
    register_response = client_backend_proxy.send_request(
        'post',
        'create_user',
        {
            'UserName': user_name,
            'Email': email,
            'Password': password
        }
    )
    assert register_response.status_code == 200
    assert len(register_response.text)
    
    return register_response.text


def delete_user(client_backend_proxy, user_id, password):
    delete_response = client_backend_proxy.send_request(
        'delete',
        'delete_user',
        {
            'UserId': user_id,
            'Password': password
        }
    )
    assert delete_response.status_code == 200
    body = json.loads(delete_response.text)
    assert body['Result']
    assert body['UserId'] == user_id

def test_regiester_and_enter(client_backend_proxy):
    password = '123456789'
    user_id = create_user(client_backend_proxy, 'username', 'test@mail.ru', password)
    
    enter_response = client_backend_proxy.send_request(
        'post',
        'auth',
        {
            'UserName': 'username',
            'Password': password
        }
    )
    assert enter_response.status_code == 200
    body = json.loads(enter_response.text)
    assert body['Result']
    assert body['UserId'] == user_id
    session_id = ''
    for cookie in enter_response.cookies:
        if cookie.name == 'session_id':
            session_id = cookie.value
    assert len(session_id)
    
    update_contact(client_backend_proxy, user_id, 'telegram', 'tg', session_id)
    update_contact(client_backend_proxy, user_id, 'email', 'test2@mail.ru', session_id)

    get_user_metadata = client_backend_proxy.send_request(
        method='get',
        uri='get_user_metadata',
        headers={
            'User-Name': 'username',
        }
    )
    assert get_user_metadata.status_code == 200
    assert json.loads(get_user_metadata.text) == {'Email': 'test2@mail.ru', 'Telegram': 'tg', 'UserId': 'nCvnBHez0bKvXglb8_gwIA=='}
    
    logout = client_backend_proxy.send_request(
        method='get',
        uri='logout',
        cookies={
            'session_id': session_id
        }
    )
    assert logout.status_code == 200

    delete_user(client_backend_proxy, user_id, password)
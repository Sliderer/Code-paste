import gzip
import base64
import json


def get_session(response):
    session_id = ''
    for cookie in response.cookies:
        if cookie.name == 'session_id':
            session_id = cookie.value
    return session_id


def compress_data(text: str):
    return gzip.compress(bytes(text, 'utf-8'))


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


def get_user_metadata(client_backend_proxy, user_name):
    get_user_metadata = client_backend_proxy.send_request(
        method='get',
        uri='get_user_metadata',
        headers={
            'User-Name': user_name,
        }
    )
    assert get_user_metadata.status_code == 200
    return get_user_metadata.text


def create_resource_request(client_backend_proxy, user_name, user_id, compressed_value, password):
    create_resource = client_backend_proxy.send_request(
        method='post',
        uri='upload_resource',
        json={
            'UserName': user_name,
            'UserId': user_id,
            'Password': password,
            'FileName': 'text',
            'FolderName': '',
            'Language': 'default',
            'HighlightSetting': 'text',
            'TTL': 0,
            'Data': base64.b64encode(compressed_value).decode()
        }
    )

    assert create_resource.status_code == 200
    assert len(create_resource.text) > 0
    
    return create_resource


def user_auth(client_backend_proxy, user_name, password):
    enter_response = client_backend_proxy.send_request(
        'post',
        'auth',
        {
            'UserName': user_name,
            'Password': password
        }
    )
    assert enter_response.status_code == 200
    return get_session(enter_response)
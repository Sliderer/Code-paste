import pytest
import json
from test_users import create_user, delete_user
from utils import get_session, compress_data, create_resource_request, user_auth

def check_response(response, status_code, text):
    assert response.status_code == status_code
    assert response.text == text

def delete_resource(client_backend_proxy, resource_uuid, user_name, user_id, session_id=None):
    headers = {
        'User-Name': user_name,
        'User-Id': user_id
    }
    cookies = {
                'session_id': session_id
              } if session_id else {}
    delete_resource = client_backend_proxy.send_request(
        method='delete',
        uri=f'delete_resource/{resource_uuid}',
        headers=headers,
        cookies=cookies
    )
    assert delete_resource.status_code == 200

def test_upload_resource(client_backend_proxy):

    resource_text = 'abcd'
    compressed_value = compress_data(resource_text)

    create_resource = create_resource_request(client_backend_proxy, 'temp', 'temp', compressed_value, '123')

    resource_uuid = create_resource.text

    get_resource = client_backend_proxy.send_request(
        method='get',
        uri=f'get_resource/{resource_uuid}',
    )

    check_response(get_resource, 200, resource_text)

    get_resource_metadata = client_backend_proxy.send_request(
        method='get',
        uri=f'get_resource_meta/{resource_uuid}',
    )

    expected_metadata = {"IsPrivate": True,"IsPrivateForCurrentUser": True,"IsLiked": False,"Owner":"temp","OwnerId":"temp","Name":"text.txt","Type":"text","HighlightSetting":"text","Path":""}
    assert get_resource_metadata.status_code == 200
    assert json.loads(get_resource_metadata.text) == expected_metadata


    get_resource_preview = client_backend_proxy.send_request(
        method='get',
        uri=f'get_resource_preview/{resource_uuid}',
    )

    expected_preview = {"Title":"text.txt","Preview":"abcd","ResourceUuid":"","Author":"temp","CreationTime":0,"Type":""}
    assert get_resource_preview.status_code == 200
    assert json.loads(get_resource_preview.text) == expected_preview
    
    
    headers = {
        'Password': '123'
    }
    check_password = client_backend_proxy.send_request(
        method='get',
        uri=f'check_password/{resource_uuid}',
        headers=headers
    )
    assert check_password.status_code == 200
    assert json.loads(check_password.text)['Result']

    delete_resource(client_backend_proxy, resource_uuid, 'temp', 'temp')
    

def test_get_and_like_resources(client_backend_proxy):
    user_name = 'user'
    password = '123456789'
    user_id = create_user(client_backend_proxy, user_name, 'test@mail.ru', password)
    session_id = user_auth(client_backend_proxy, user_name, password)

    resource_text = 'abcd'
    compressed_value = compress_data(resource_text)
    create_resource = create_resource_request(client_backend_proxy, user_name, user_id, compressed_value, '123')
    resource_uuid = create_resource.text
    
    get_resources = client_backend_proxy.send_request(
        method='get',
        uri=f'get_resources',
        headers={
            'Path': '',
            'User-Id': user_id
        }
    )

    resources = {
       'Resources': [
           {
               'Author': user_name,
               'CreationTime': 1744236196,
               'Preview': 'abcd',
               'ResourceUuid': resource_uuid,
               'Title': 'text',
               'Type': 'text',
           },
       ],
    }
    assert get_resources.status_code == 200
    response = json.loads(get_resources.text)
    resources['Resources'][0]['CreationTime'] = response['Resources'][0]['CreationTime']
    assert response == resources
    
    like_resource = client_backend_proxy.send_request(
        method='post',
        uri=f'like_resource',
        json={
            'UserId': user_id,
            'ResourceUuid': resource_uuid
        },
        cookies={
            'session_id': session_id
        }
    )
    assert like_resource.status_code == 200
    
    get_resources = client_backend_proxy.send_request(
        method='get',
        uri=f'get_resources',
        headers={
            'Path': '',
            'User-Id': user_id,
            'Need-Only-Liked': 'true'
        }
    )
    assert get_resources.status_code == 200
    response = json.loads(get_resources.text)
    resources['Resources'][0]['CreationTime'] = response['Resources'][0]['CreationTime']
    assert response == resources
    
    delete_user(client_backend_proxy, user_id, password)
    delete_resource(client_backend_proxy, resource_uuid, user_name, user_id, session_id)


def test_not_existing_resource(client_backend_proxy):
    get_resource = client_backend_proxy.send_request(
        method='get',
        uri=f'get_resource/123',
    )
    assert get_resource.status_code == 500
    
    
def test_check_wrong_resource_password(client_backend_proxy):
    resource_text = 'abcd'
    compressed_value = compress_data(resource_text)

    create_resource = create_resource_request(client_backend_proxy, 'temp', 'temp', compressed_value, '123')

    resource_uuid = create_resource.text
    headers = {
        'Password': 'not_valid_password'
    }
    check_password = client_backend_proxy.send_request(
        method='get',
        uri=f'check_password/{resource_uuid}',
        headers=headers
    )
    assert check_password.status_code == 200
    response = json.loads(check_password.text)
    assert not response['Result']

    delete_resource(client_backend_proxy, resource_uuid, 'temp', 'temp')
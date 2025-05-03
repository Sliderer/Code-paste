import pytest
import json
from test_users import create_user, delete_user
from utils import user_auth

def test_folder(client_backend_proxy):
    user_name = 'user'
    password = '123456789'
    user_id = create_user(client_backend_proxy, user_name, 'test@mail.ru', password)
    
    session_id = user_auth(client_backend_proxy, user_name, password)
    
    create_folder = client_backend_proxy.send_request(
        method='post',
        uri='/create_folder',
        json={
            'FolderName': '',
            'FolderPath': 'default/wef'
        },
        cookies={
            'session_id': session_id
        }
    )
    assert create_folder.status_code == 200
    
    get_resources = client_backend_proxy.send_request(
        method='get',
        uri=f'get_resources',
        headers={
            'Path': 'default/wef',
            'User-Id': user_id
        }
    )

    resources = {
       'Resources': [
           {'Title': '', 'Preview': '', 'ResourceUuid': '4ARWHnE_-8cQMQdq6QfXSg==', 'Author': user_name, 'CreationTime': 0, 'Type': 'folder'}
       ],
    }
    assert get_resources.status_code == 200
    response = json.loads(get_resources.text)
    resources['Resources'][0]['CreationTime'] = response['Resources'][0]['CreationTime']
    resources['Resources'][0]['ResourceUuid'] = response['Resources'][0]['ResourceUuid']
    assert response == resources

    folder_uuid = response['Resources'][0]['ResourceUuid']
    
    get_folder_uuid = client_backend_proxy.send_request(
        method='get',
        uri=f'get_folderUuid',
        headers={
            'Path': f'{user_name}/wef/',
        }
    )
    assert get_folder_uuid.status_code == 200
    assert get_folder_uuid.text == folder_uuid


    delete_folder = client_backend_proxy.send_request(
        method='delete',
        uri=f'/delete_folder/{folder_uuid}',
        cookies={
            'session_id': session_id
        }
    )
    assert delete_folder.status_code == 200
    delete_user(client_backend_proxy, user_id, password)


def test_without_auth_folder_create(client_backend_proxy):
    create_folder = client_backend_proxy.send_request(
        method='post',
        uri='/create_folder',
        json={
            'FolderName': '',
            'FolderPath': 'default/wef'
        },
    )
    assert create_folder.status_code == 401


def test_get_non_existing_folder(client_backend_proxy):
    get_folder_uuid = client_backend_proxy.send_request(
        method='get',
        uri=f'get_folderUuid',
        headers={
            'Path': f'sliderer10/wef/',
        }
    )
    assert get_folder_uuid.status_code == 200
    assert get_folder_uuid.text == ''


def test_without_auth_folder_delete(client_backend_proxy):
    delete_folder = client_backend_proxy.send_request(
        method='delete',
        uri=f'/delete_folder/1213',
    )
    assert delete_folder.status_code == 401
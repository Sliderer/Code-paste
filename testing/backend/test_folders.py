import pytest
import json
from test_users import create_user, delete_user
from utils import get_session

def test_folder(client_backend_proxy):
    password = '123456789'
    user_id = create_user(client_backend_proxy, 'user', 'test@mail.ru', password)
    
    enter_response = client_backend_proxy.send_request(
        'post',
        'auth',
        {
            'UserName': 'user',
            'Password': password
        }
    )
    assert enter_response.status_code == 200
    session_id = get_session(enter_response)
    
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
           {'Title': '', 'Preview': '', 'ResourceUuid': '4ARWHnE_-8cQMQdq6QfXSg==', 'Author': 'user', 'CreationTime': 0, 'Type': 'folder'}
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
            'Path': 'user/wef/',
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
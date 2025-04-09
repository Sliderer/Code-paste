import pytest
import json
from test_users import create_user, delete_user

# def test_folder(client_backend_proxy):
#     password = '123456789'
#     user_id = create_user(client_backend_proxy, 'user', 'test@mail.ru', password)
    
#     create_folder = client_backend_proxy.send_request(
#         method='post',
#         uri='/create_folder',
#         json={
#             'UserName': 'user',
#             'UserId': user_id,
#             'FolderName': '',
#             'FolderPath': 'default'
#         }
#     )
#     assert create_folder.status_code == 200
    

#     get_resources = client_backend_proxy.send_request(
#         method='get',
#         uri=f'get_resources',
#         headers={
#             'Path': '',
#             'User-Id': user_id
#         }
#     )

#     resources = {
#        'Resources': [
#            {
#                'Author': 'user',
#                'CreationTime': 1744236196,
#                'Preview': 'abcd',
#                'ResourceUuid': '123',
#                'Title': 'text',
#                'Type': 'text',
#            },
#        ],
#     }
#     assert get_resources.status_code == 200
#     response = json.loads(get_resources.text)
#     # resources['Resources'][0]['CreationTime'] = response['Resources'][0]['CreationTime']
#     # resources['Resources'][0]['ResourceUuid'] = response['Resources'][0]['ResourceUuid']
#     # assert response == resources
#     folder_uuid = response['Resources'][0]['ResourceUuid']
    
    
#     delete_folder = client_backend_proxy.send_request(
#         method='delete',
#         uri=f'/delete_folder/{folder_uuid}',
#         headers={
#             'User-Id': user_id,
#         }
#     )
#     assert delete_folder.status_code == 200
#     delete_user(client_backend_proxy, user_id, password)
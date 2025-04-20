from .settings import client_server_address

import requests

class ClientServerProxy:
    def send_request(self, method, uri, json=None, data=None, headers=None, cookies=None):
        response = requests.request(
            method=method,
            url=f'{client_server_address}/{uri}',
            json=json,
            data=data,
            headers=headers,
            cookies=cookies
        )
        return response

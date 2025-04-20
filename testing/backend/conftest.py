import sys
sys.path.append('../')

import pytest
from proxies.client_server_proxy import ClientServerProxy

@pytest.fixture(scope="session", autouse=True)
def client_backend_proxy():
    return ClientServerProxy()
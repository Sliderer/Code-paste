def get_session(response):
    session_id = ''
    for cookie in response.cookies:
        if cookie.name == 'session_id':
            session_id = cookie.value
    return session_id
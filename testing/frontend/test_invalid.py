import pytest
import time
from frontend_utils import *

@pytest.mark.parametrize('invalid_nickname', [True, False])
@pytest.mark.parametrize('invalid_password', [True, False])
def test_invalid_enter(web_driver, default_user, invalid_nickname, invalid_password):
    driver = web_driver('enter')

    email_placeholder = get_element_by_id(driver, 'email_placeholder')
    password_placeholder = get_element_by_id(driver, 'password_placeholder')
    enter_button = get_element_by_id(driver, 'enter_button')
    
    if not invalid_nickname:
        email_placeholder.send_keys(default_user.user_name)
    if not invalid_password:
        password_placeholder.send_keys(default_user.password)
    enter_button.click()
    time.sleep(1)
    if not invalid_nickname and not invalid_password:
        check_account_page(driver, True)
    else:
        get_element_by_id(driver, 'email_placeholder')
        get_element_by_id(driver, 'password_placeholder')
    driver.quit()


@pytest.mark.parametrize('empty_password', [True, False])
@pytest.mark.parametrize('empty_email', [True, False])
@pytest.mark.parametrize('empty_nickname', [True, False])
def test_invalid_register(web_driver, second_user, user_deleter, get_user_id, empty_password, empty_email, empty_nickname):
    driver = web_driver('registration')
    name_placeholder = get_element_by_id(driver, 'name_placeholder')
    email_placeholder = get_element_by_id(driver, 'email_placeholder')
    password_placeholder = get_element_by_id(driver, 'password_placeholder')
    register_button = get_element_by_id(driver, 'register_button')
    
    if not empty_nickname:
        name_placeholder.send_keys(second_user.user_name)
    
    if not empty_email:
        email_placeholder.send_keys(second_user.email)
    
    if not empty_password:
        password_placeholder.send_keys(second_user.password)
    
    register_button.click()
    time.sleep(0.7)

    get_element_by_id(driver, 'name_placeholder')
    get_element_by_id(driver, 'email_placeholder')
    get_element_by_id(driver, 'password_placeholder')
    driver.quit()

    
def test_not_existing_account_page(web_driver):
    driver = web_driver('account/user123')
    check_account_page(driver, False)
    driver.quit()


def test_not_exiting_resource_demonstration(web_driver, create_resource):
    driver = web_driver(f'resource/123')
    time.sleep(1)
    get_element_by_id(driver, 'loading_panel')
    
    driver.quit()
    
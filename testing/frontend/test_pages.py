import pytest
import time
from frontend_utils import *


def test_enter_page(web_driver, default_user):
    driver = web_driver('enter')
    enter_account(driver, default_user)
    time.sleep(1)
    check_account_page(driver, True)
    driver.quit()


def test_register_page(web_driver, second_user, user_deleter, get_user_id):
    driver = web_driver('registration')
    name_placeholder = get_element_by_id(driver, 'name_placeholder')
    email_placeholder = get_element_by_id(driver, 'email_placeholder')
    password_placeholder = get_element_by_id(driver, 'password_placeholder')
    register_button = get_element_by_id(driver, 'register_button')
    
    name_placeholder.send_keys(second_user.user_name)
    email_placeholder.send_keys(second_user.email)
    password_placeholder.send_keys(second_user.password)
    
    register_button.click()
    time.sleep(0.7)
    check_account_page(driver, True)
    
    user_id = get_user_id(second_user.user_name)
    second_user.user_id = user_id
    user_deleter(second_user)
    driver.quit()

    
def test_account_page(web_driver):
    driver = web_driver('account/user')
    check_account_page(driver, False)
    driver.quit()
    

def test_resource_creation_page(web_driver, default_user):
    driver = web_driver('enter')
    enter_account(driver, default_user)
    time.sleep(1)
    create_resource_button = get_element_by_id(driver, 'create_resource_button')
    create_resource_button.click()
    time.sleep(1)
    check_resource_creation_page(driver)
    driver.quit()


def test_resource_demonstration(web_driver, create_resource):
    resource_uuid = create_resource('Hello world')
    driver = web_driver(f'resource/{resource_uuid}')
    time.sleep(1)
    check_resource_demonstration_page(driver)
    
    driver.quit()
    

def test_search_page(web_driver, default_user, create_resource):
    resource_uuid = create_resource('Hello world')
    driver = web_driver('enter')
    enter_account(driver, default_user)
    time.sleep(1)

    search_placeholder = get_element_by_id(driver, 'search_placeholder')
    search_button = get_element_by_id(driver, 'search_button')
    search_placeholder.send_keys('hello')
    search_button.click()
    time.sleep(1)
    
    check_search_page(driver)
    driver.quit()
from selenium.webdriver.common.by import By

def get_element_by_id(driver, id):
    try:
        element = driver.find_element(By.ID, id)
    except Exception as e:
        print(e)
        assert 0
        
    return element


def check_account_page(driver, is_loged_in):
    get_element_by_id(driver, 'resources_list')
    get_element_by_id(driver, 'nickname_text')
    
    if is_loged_in:
        get_element_by_id(driver, 'logout_button')
        get_element_by_id(driver, 'email_text')
        get_element_by_id(driver, 'telegram_text')
        get_element_by_id(driver, 'my_resources_button')
        get_element_by_id(driver, 'liked_resources_button')
        get_element_by_id(driver, 'create_folder_button')
    else:
        get_element_by_id(driver, 'subsrcibe_button')


def check_resource_creation_page(driver):
    get_element_by_id(driver, 'input_field')
    get_element_by_id(driver, 'filename_placeholder')
    get_element_by_id(driver, 'password_placeholder')
    get_element_by_id(driver, 'folder_name_placeholder')
    get_element_by_id(driver, 'life_period_select')
    get_element_by_id(driver, 'hoghlight_select')
    get_element_by_id(driver, 'language_select')
    get_element_by_id(driver, 'publish_button')
    

def check_search_page(driver):
    get_element_by_id(driver, 'resource_preview_link')
    get_element_by_id(driver, 'resource_preview_panel')


def check_resource_demonstration_page(driver):
    get_element_by_id(driver, 'action_button')
    get_element_by_id(driver, 'demonstration_panel')


def enter_account(driver, default_user):
    email_placeholder = get_element_by_id(driver, 'email_placeholder')
    password_placeholder = get_element_by_id(driver, 'password_placeholder')
    enter_button = get_element_by_id(driver, 'enter_button')
    
    email_placeholder.send_keys(default_user.user_name)
    password_placeholder.send_keys(default_user.password)
    
    enter_button.click()
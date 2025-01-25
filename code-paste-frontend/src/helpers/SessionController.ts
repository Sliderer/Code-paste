export const getCurrentNickname = () => {
    return sessionStorage.getItem('user_name');
}

export const setCurrentNickname = (userName: string) => {
    sessionStorage.setItem('user_name', userName);
}
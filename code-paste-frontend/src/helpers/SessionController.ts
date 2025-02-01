export const getCurrentNickname = () => {
    return sessionStorage.getItem('user_name');
}

export const setCurrentNickname = (userName: string) => {
    sessionStorage.setItem('user_name', userName);
}

export const setCurrentId = (userId: string) => {
    sessionStorage.setItem('user_id', userId);
}

export const getCurrentId = () => {
    return sessionStorage.getItem('user_id');
}

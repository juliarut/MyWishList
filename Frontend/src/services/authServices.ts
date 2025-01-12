export const getCurrentUser = (): string => {
    const user = localStorage.getItem('currentUser');
    return user ? user : "TestUser";
};

export const isLoggedIn = (): boolean => {
    return localStorage.getItem('currentUser') !== null;
};

export const loginUser = (username: string) => {
    localStorage.setItem('currentUser', username);
};

export const logoutUser = () => {
    localStorage.removeItem('currentUser');
};

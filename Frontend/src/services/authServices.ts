
export const getCurrentUser = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('loggedin') ?? "TestUser";
};

export const isLoggedIn = (): boolean => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('loggedin');
};

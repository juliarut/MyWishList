import createClient from 'openapi-fetch';
import type { paths } from '../types/openapi.d';

const apiClient = createClient<paths>({
    baseUrl: 'http://localhost:5024/api'
});

export const getUsers = async () => {
    const response = await apiClient.GET('/api/User');
    if (response.response.ok) {
        return response.data; 
    } else {
        return [];
    }
};

export const createUser = async (username: string) => {
    const response = await apiClient.POST('/api/User', {
        body: { username }
    });
    if (response.response.ok) {
        return response.data;
    } else {
        return null;
    }
};

export const getWishLists = async () => {
    const response = await apiClient.GET('/api/wishlist');
    if (response.response.ok) {
        return response.data;
    } else {
        return [];
    }
};

export const getWishListById = async (id: number) => {
    const response = await apiClient.GET('/api/wishlist/{id}', {
        params: {
            path: { id }
        }
    });
    if (response.response.ok) {
        return response.data;
    } else {
        return null;
    }
};

export const createWishList = async (wishList: { userId: number; wishListName: string; items: [] }) => {
    const response = await apiClient.POST('/api/wishlist', {
        body: wishList
    });
    if (response.response.ok) {
        return response.data;
    } else {
        return null;
    }
};

// export const deleteWishList = async (id: number) => {
//     const response = await apiClient.DELETE('/api/wishlist/{id}', {
//         params: {
//             path: { id }
//         }
//     });
//     return response.response.ok;
// };   

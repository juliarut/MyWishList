
import createClient from 'openapi-fetch';
import type { paths } from '../types/openapi.d';


export const apiClient = createClient<paths>({
    baseUrl: 'http://localhost:5024/api'
});


export const getUsers = async () => {
    const response = await apiClient.GET('/api/User');
    if (response.response.ok) {
        return response.data; 
    } else {
        console.error('Error fetching users:', response.error);
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
        console.error('Error creating user:', response.error);
        return null;
    }
};

export const getWishLists = async () => {
    const response = await apiClient.GET('/api/wishlist');
    if (response.response.ok) {
        return response.data;
    } else {
        console.error('Error fetching wishlists:', response.error);
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
        console.error('Error fetching wishlist:', response.error);
        return null;
    }
};

export const deleteWishList = async (id: number) => {
    const response = await apiClient.DELETE('/api/wishlist/{id}', { 
    });
    if (!response.response.ok) {
        console.error('Failded to delete wishlist:', response.error);
    }
    return response.response.ok;
};

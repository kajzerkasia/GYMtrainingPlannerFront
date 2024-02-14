import {apiUrl} from "../config/api";

export const UseFetchImages = () => {
    async function fetchSelectableImages() {
        try {
            const response = await fetch(`${apiUrl}/api/auth-user/images`);

            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas próby załadowania zdjęć.');
            }

            const responseData = await response.json();

            if (!responseData || !responseData.images) {
                throw new Error('Nieprawidłowe dane z serwera: brak właściwości "images".');
            }


            return responseData.images;
        } catch (error) {
            console.error('Błąd podczas pobierania zdjęć:', error);
            throw error;
        }
    }

    return {
        fetchSelectableImages,
    };
};

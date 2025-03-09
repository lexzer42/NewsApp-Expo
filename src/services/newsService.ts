import axios from "axios";
import { NEWS_API_BASE_URL, NEWS_API_KEY } from '@env';
import { Article, NewsApiResponse, NewsApiError } from "../interfaces/news";
import { generateUniqueId } from "../utils/generateUniqueId";

// Verificar que las variables de entorno estén definidas
if (!NEWS_API_BASE_URL || !NEWS_API_KEY) {
    throw new Error(
        "Missing environment variables. Make sure NEWS_API_BASE_URL and NEWS_API_KEY are defined in your .env file."
    );
}

// Configurar Axios sin valores por defecto
const newsApiClient = axios.create({
    baseURL: NEWS_API_BASE_URL,
    headers: {
        "X-Api-Key": NEWS_API_KEY,
    },
});

// Función para obtener las noticias
export const fetchTopHeadlines = async (): Promise<Article[]> => {
    try {
        const response = await newsApiClient.get<NewsApiResponse>(
            "/top-headlines?country=us"
        );

        if (response.data.status !== "ok") {
            throw {
                message: response.data.message || "Unknown error from NewsAPI",
                code: response.data.code,
            } as NewsApiError;
        }

        // Add unique ID to each article
        const articlesWithId = response.data.articles.map(article => ({
            ...article,
            id: generateUniqueId(),
        }));

        return articlesWithId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || "Network Error",
                code: error.response?.data?.code,
            } as NewsApiError;
        }
        throw {
            message: error instanceof Error ? error.message : "Unknown error",
        } as NewsApiError;
    }
};
// Función para obtener noticias por categoría
export const fetchTopHeadlinesByCategory = async (category: string): Promise<Article[]> => {
    try {
        const response = await newsApiClient.get<NewsApiResponse>(
            `/top-headlines?country=us&category=${category}`
        );

        if (response.data.status !== "ok") {
            throw {
                message: response.data.message || "Unknown error from NewsAPI",
                code: response.data.code,
            } as NewsApiError;
        }

        // Add unique ID to each article
        const articlesWithId = response.data.articles.map(article => ({
            ...article,
            id: generateUniqueId(),
        }));

        return articlesWithId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || "Network Error",
                code: error.response?.data?.code,
            } as NewsApiError;
        }
        throw {
            message: error instanceof Error ? error.message : "Unknown error",
        } as NewsApiError;
    }
};

// Función para obtener noticias paginadas (para scroll infinito)
export const fetchTopHeadlinesPaginated = async (page: number): Promise<Article[]> => {
    try {
        const pageSize = 10;
        const response = await newsApiClient.get<NewsApiResponse>(
            `/top-headlines?country=us&page=${page}&pageSize=${pageSize}`
        );

        if (response.data.status !== "ok") {
            throw {
                message: response.data.message || "Unknown error from NewsAPI",
                code: response.data.code,
            } as NewsApiError;
        }

        // Si no hay artículos, retornar array vacío
        if (!response.data.articles || response.data.articles.length === 0) {
            return [];
        }

        // Add unique ID to each article
        const articlesWithId = response.data.articles.map(article => ({
            ...article,
            id: generateUniqueId(),
        }));

        return articlesWithId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || "Network Error",
                code: error.response?.data?.code,
            } as NewsApiError;
        }
        throw {
            message: error instanceof Error ? error.message : "Unknown error",
        } as NewsApiError;
    }
};

export const fetchTopHeadlinesPaginatedByCategory = async (page: number, category: string): Promise<Article[]> => {
    try {
        const pageSize = 10;
        const response = await newsApiClient.get<NewsApiResponse>(
            `/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}`
        );

        if (response.data.status !== "ok") {
            throw {
                message: response.data.message || "Unknown error from NewsAPI",
                code: response.data.code,
            } as NewsApiError;
        }

        // Si no hay artículos, retornar array vacío
        if (!response.data.articles || response.data.articles.length === 0) {
            return [];
        }

        // Add unique ID to each article
        const articlesWithId = response.data.articles.map(article => ({
            ...article,
            id: generateUniqueId(),
        }));

        return articlesWithId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || "Network Error",
                code: error.response?.data?.code,
            } as NewsApiError;
        }
        throw {
            message: error instanceof Error ? error.message : "Unknown error",
        } as NewsApiError;
    }
};
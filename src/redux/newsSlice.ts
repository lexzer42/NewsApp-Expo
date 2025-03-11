import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../interfaces/news';
import {
  fetchTopHeadlines,
  fetchTopHeadlinesByCategory,
  fetchTopHeadlinesPaginated,
  fetchTopHeadlinesPaginatedByCategory,
} from '../services/newsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logError } from '../utils/logger';

// Define state interface
interface NewsState {
  articles: Article[];
  savedArticles: Article[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMorePages: boolean;
  currentCategory: string | null;
}

// Initial state
const initialState: NewsState = {
  articles: [],
  savedArticles: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMorePages: true,
  currentCategory: null,
};

// Load saved articles from localStorage (for web) or AsyncStorage (for mobile)
export const loadSavedArticles = createAsyncThunk('news/loadSavedArticles', async () => {
  try {
    const savedArticlesJson = await AsyncStorage.getItem('savedArticles');
    return savedArticlesJson ? JSON.parse(savedArticlesJson) : [];
  } catch (error) {
    logError('Failed to load saved articles', error);
    return [];
  }
});

// Fetch news thunk
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      if (page === 1) {
        return await fetchTopHeadlines();
      } else {
        return await fetchTopHeadlinesPaginated(page);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar noticias';
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch news by category
export const fetchNewsByCategory = createAsyncThunk(
  'news/fetchNewsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      return await fetchTopHeadlinesByCategory(category);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar categoría';
      return rejectWithValue(errorMessage);
    }
  }
);

// Paginated news fetch for infinite scrolling
export const fetchMoreNews = createAsyncThunk(
  'news/fetchMoreNews',
  async (page: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { news: NewsState };
      const { currentCategory } = state.news;

      if (currentCategory) {
        // Si hay una categoría seleccionada, obtener noticias de esa categoría
        return await fetchTopHeadlinesPaginatedByCategory(page, currentCategory);
      } else {
        // Si no, obtener todas las noticias
        return await fetchTopHeadlinesPaginated(page);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar más noticias';
      return rejectWithValue(errorMessage);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    saveArticle: (state, action: PayloadAction<Article>) => {
      // Prevent duplicate saves
      const isDuplicate = state.savedArticles.some((article) => article.url === action.payload.url);

      if (!isDuplicate) {
        state.savedArticles.push(action.payload);
        // Save to AsyncStorage
        try {
          AsyncStorage.setItem('savedArticles', JSON.stringify(state.savedArticles));
        } catch (error) {
          console.error('Error saving article', error);
        }
      }
    },
    unsaveArticle: (state, action: PayloadAction<Article>) => {
      state.savedArticles = state.savedArticles.filter(
        (article) => article.url !== action.payload.url
      );
      // Update AsyncStorage
      try {
        AsyncStorage.setItem('savedArticles', JSON.stringify(state.savedArticles));
      } catch (error) {
        console.error('Error removing saved article', error);
      }
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.hasMorePages = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        state.currentPage = 1;
        state.hasMorePages = action.payload.length >= 10;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentPage = 1;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.meta.arg ? action.payload : [];
        state.currentPage = 1;
        state.hasMorePages = action.payload.length >= 10;
        // Almacenar la categoría seleccionada
        state.currentCategory = action.meta.arg;
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMoreNews.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMoreNews.fulfilled, (state, action) => {
        const newArticles = action.payload.filter(
          (newArticle) =>
            !state.articles.some((existingArticle) => existingArticle.url === newArticle.url)
        );

        if (newArticles.length > 0) {
          state.articles = [...state.articles, ...newArticles];
          state.currentPage += 1;
          state.hasMorePages = newArticles.length >= 10;
        } else {
          state.hasMorePages = false;
        }
      })
      .addCase(fetchMoreNews.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(loadSavedArticles.fulfilled, (state, action) => {
        state.savedArticles = action.payload;
      });
  },
});

export const { saveArticle, unsaveArticle, resetPagination } = newsSlice.actions;
export default newsSlice.reducer;

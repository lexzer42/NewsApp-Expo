import newsReducer, { saveArticle, unsaveArticle } from '../../redux/newsSlice';
import { Article } from '../../interfaces/news';

describe('News Reducer', () => {
  // Estado inicial para pruebas
  const initialState = {
    articles: [],
    savedArticles: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasMorePages: true,
    currentCategory: null,
  };

  // Mock de artículo para pruebas
  const mockArticle: Article = {
    id: 'test-id-1',
    source: { id: 'test-source', name: 'Test Source' },
    author: 'Test Author',
    title: 'Test Title',
    description: 'Test Description',
    url: 'https://test.com/article',
    urlToImage: 'https://test.com/image.jpg',
    publishedAt: '2023-01-01T00:00:00Z',
    content: 'Test content',
  };

  it('should handle initial state', () => {
    expect(newsReducer(undefined, { type: 'unknown' })).toEqual({
      articles: [],
      savedArticles: [],
      loading: false,
      error: null,
      currentPage: 1,
      hasMorePages: true,
      currentCategory: null,
    });
  });

  it('should handle saveArticle', () => {
    const actual = newsReducer(initialState, saveArticle(mockArticle));
    expect(actual.savedArticles).toContainEqual(mockArticle);
    expect(actual.savedArticles.length).toBe(1);
  });

  it('should handle unsaveArticle', () => {
    // Primero guardamos un artículo
    const stateWithSavedArticle = newsReducer(initialState, saveArticle(mockArticle));
    // Luego lo eliminamos
    const actual = newsReducer(stateWithSavedArticle, unsaveArticle(mockArticle));
    expect(actual.savedArticles).toEqual([]);
  });

  it('should not allow duplicate saved articles', () => {
    // Guardar el mismo artículo dos veces
    let state = newsReducer(initialState, saveArticle(mockArticle));
    state = newsReducer(state, saveArticle(mockArticle));

    // Debe seguir habiendo solo un artículo guardado
    expect(state.savedArticles.length).toBe(1);
  });
});

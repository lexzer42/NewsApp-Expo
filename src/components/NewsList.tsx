import React, { useEffect, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchNews, fetchMoreNews, saveArticle, unsaveArticle } from '../redux/newsSlice';
import {
  Card,
  Title,
  Paragraph,
  Button,
  useTheme,
  Text,
  Chip,
  ActivityIndicator,
  Caption,
  IconButton as PaperIconButton,
} from 'react-native-paper';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Article, RootStackParamList } from '../interfaces/news';
import { EmptyState, ErrorMessage } from './StatusHandler';
import SkeletonLoading from './SkeletonLoading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type NewsListNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

const NewsList = () => {
  const { articles, savedArticles, loading, error, currentPage, hasMorePages, currentCategory } =
    useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const flatListRef = React.useRef<FlatList>(null);
  const navigation = useNavigation<NewsListNavigationProp>();
  const theme = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load news on component mount
  useEffect(() => {
    dispatch(fetchNews(1));
    return () => {
      // Cleanup when component unmounts (reset news)
      dispatch({ type: 'news/resetPagination' });
    };
  }, [dispatch]);

  // Navigation handler
  const goToDetail = (article: Article) => {
    navigation.navigate('Detail', { article });
  };

  // Check if article is saved
  const isArticleSaved = useCallback(
    (url: string) => {
      return savedArticles.some((article) => article.url === url);
    },
    [savedArticles]
  );

  // Handle article save/unsave
  const toggleSaveArticle = (article: Article) => {
    if (isArticleSaved(article.url)) {
      dispatch(unsaveArticle(article));
    } else {
      dispatch(saveArticle(article));
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await dispatch(fetchNews(1));
    setIsRefreshing(false);
  };

  // Efecto para controlar el scroll cuando cambia la categoría
  useEffect(() => {
    // Cuando cambia la categoría, volver al inicio de la lista
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [currentCategory]);

  // Load more articles for infinite scrolling
  const loadMoreArticles = async () => {
    if (!loading && !loadingMore && hasMorePages) {
      setLoadingMore(true);
      await dispatch(fetchMoreNews(currentPage + 1));
      setLoadingMore(false);
    }
  };

  // Render footer for infinite scrolling
  const renderFooter = () => {
    if ((loading || loadingMore) && !isRefreshing) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      );
    }

    if (!hasMorePages && articles.length > 0) {
      return (
        <View style={styles.endMessageContainer}>
          <Text style={styles.endMessage}>No hay más noticias disponibles</Text>
        </View>
      );
    }

    return null;
  };

  // Error state
  if (error && !articles.length) {
    return <ErrorMessage message={error} />;
  }

  // Loading state with skeleton (shows when loading initially)
  if (loading && !articles.length && !isRefreshing) {
    return <SkeletonLoading />;
  }

  // Empty state
  if (articles.length === 0 && !loading) {
    return <EmptyState message="No se encontraron noticias" />;
  }

  const renderItem = ({ item }: { item: Article }) => (
    <Card mode="elevated" style={styles.card} elevation={3}>
      <TouchableOpacity onPress={() => goToDetail(item)}>
        {item.urlToImage ? (
          <Card.Cover source={{ uri: item.urlToImage }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}
        <Card.Content>
          <Title numberOfLines={2} style={styles.title}>
            {item.title}
          </Title>

          <View style={styles.sourceContainer}>
            <Chip style={styles.chip}>{item.source.name}</Chip>
            <Caption style={styles.date}>{format(new Date(item.publishedAt), 'dd MMM')}</Caption>
          </View>

          <Paragraph numberOfLines={3} style={styles.description}>
            {item.description}
          </Paragraph>
        </Card.Content>
      </TouchableOpacity>
      <Card.Actions style={styles.cardActions}>
        <Button mode="text" icon="arrow-right" onPress={() => goToDetail(item)}>
          Leer más
        </Button>
        <PaperIconButton
          icon={isArticleSaved(item.url) ? 'bookmark' : 'bookmark-outline'}
          iconColor={isArticleSaved(item.url) ? theme.colors.primary : '#757575'}
          size={22}
          onPress={() => toggleSaveArticle(item)}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || item.url}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreArticles}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={100}
        ListHeaderComponent={
          currentCategory ? (
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderText}>
                Categoría: {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 12,
    paddingBottom: 20,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  endMessageContainer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  endMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  source: {
    fontWeight: '600',
  },
  date: {
    fontStyle: 'italic',
  },
  card: {
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    height: 180,
  },
  placeholderImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#bdbdbd',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  chip: {
    height: 28,
    backgroundColor: 'rgba(30, 136, 229, 0.2)',
  },
  chipText: {
    fontSize: 12,
  },
  description: {
    marginTop: 8,
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
  cardActions: {
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  categoryHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  categoryHeaderText: {
    fontWeight: 'bold',
    color: '#1e88e5',
    textAlign: 'center',
  },
});

export default NewsList;

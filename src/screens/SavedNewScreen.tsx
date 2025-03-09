import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { loadSavedArticles } from '../redux/newsSlice';
import { Card, Title, Paragraph, useTheme, IconButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { EmptyState } from '../components/StatusHandler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Article } from '../interfaces/news';

type SavedNewsNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

const SavedNewsScreen = () => {
  const { savedArticles } = useAppSelector(state => state.news);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SavedNewsNavigationProp>();
  const theme = useTheme();

  // Load saved articles on component mount
  useEffect(() => {
    dispatch(loadSavedArticles());
  }, [dispatch]);

  // Navigate to article detail
  const goToDetail = (article: Article) => {
    navigation.navigate("Detail", { article });
  };

  // Render saved article item
  const renderItem = ({ item }: { item: Article }) => (
    <Card style={styles.card} mode="elevated" onPress={() => goToDetail(item)}>
      {item.urlToImage && (
        <Card.Cover source={{ uri: item.urlToImage }} style={styles.image} />
      )}
      <Card.Content style={styles.content}>
        <Title numberOfLines={2} style={styles.title}>{item.title}</Title>
        <View style={styles.sourceRow}>
          <Text style={styles.source}>{item.source.name}</Text>
          <Text style={styles.date}>
            {format(new Date(item.publishedAt), "dd MMM yyyy")}
          </Text>
        </View>
        <Paragraph numberOfLines={2} style={styles.description}>
          {item.description}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  // Show empty state if no saved articles
  if (savedArticles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState message="Aún no tienes noticias guardadas" />
        <Text style={styles.hint}>
          Guarda artículos presionando el ícono de marcador en el detalle de la noticia
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedArticles}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hint: {
    marginTop: 16,
    textAlign: 'center',
    color: '#757575',
  },
  list: {
    padding: 12,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    height: 140,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default SavedNewsScreen;
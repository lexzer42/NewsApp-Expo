import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchNewsByCategory, resetPagination } from '../redux/newsSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/news';

// Better width calculation
const { width } = Dimensions.get('window');
const numColumns = 2;
const gap = 16;
const padding = 16;
const availableWidth = width - padding * 2 - gap * (numColumns - 1);
const itemWidth = Math.floor(availableWidth / numColumns);

const categories = [
  { id: 'business', name: 'Negocios', icon: '💼', label: 'Briefcase', color: '#FF9800' },
  {
    id: 'entertainment',
    name: 'Entretenimiento',
    icon: '🎭',
    label: 'Entertainment',
    color: '#E91E63',
  },
  { id: 'health', name: 'Salud', icon: '🏥', label: 'Hospital', color: '#2196F3' },
  { id: 'science', name: 'Ciencia', icon: '🔬', label: 'Science', color: '#4CAF50' },
  { id: 'sports', name: 'Deportes', icon: '⚽', label: 'Sports', color: '#FF5722' },
  { id: 'technology', name: 'Tecnología', icon: '💻', label: 'Technology', color: '#9C27B0' },
];
// type definition
type CategoriesNavigationProp = StackNavigationProp<RootStackParamList, 'Categories'>;

const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesNavigationProp>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.news.loading);

  const handleCategoryPress = (category: string) => {
    // Limpiar la lista antes de cargar nuevos artículos
    dispatch(resetPagination());
    // Cargar artículos de la categoría seleccionada
    dispatch(fetchNewsByCategory(category));
    // Navigate to News screen
    navigation.navigate('News');
  };

  const renderCategory = ({ item, index }: { item: (typeof categories)[0]; index: number }) => {
    // Calculate position
    const isEven = index % 2 === 0;

    // Use a simpler layout for web
    const isWeb = Platform.OS === 'web';

    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item.id)}
        style={[styles.cardWrapper, { marginRight: isEven ? gap : 0 }]}
        disabled={loading}
        activeOpacity={0.7}
      >
        <Card style={styles.card} mode="elevated">
          <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
            {isWeb ? (
              <Text style={styles.webEmoji}>{item.label[0]}</Text>
            ) : (
              <Text style={styles.emoji}>{item.icon}</Text>
            )}
          </View>
          <Card.Content style={styles.cardContent}>
            <Title style={styles.categoryTitle}>{item.name}</Title>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
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
    padding: padding,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    width: itemWidth,
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          minHeight: 130,
        }
      : {
          elevation: 3,
        }),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  cardContent: {
    alignItems: 'center',
    padding: 12,
  },
  emoji: {
    fontSize: 40,
  },
  webEmoji: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    width: 60,
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 30,
  },
  categoryTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CategoriesScreen;

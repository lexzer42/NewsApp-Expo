import React from "react";
import { format } from "date-fns";
import { ScrollView, StyleSheet, View, Linking } from "react-native";
import { Card, Title, Paragraph, Button, Divider, Chip, useTheme, IconButton as PaperIconButton } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../interfaces/news";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { saveArticle, unsaveArticle } from "../redux/newsSlice";

type Props = StackScreenProps<RootStackParamList, "Detail">;

const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { article } = route.params;
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const savedArticles = useAppSelector(state => state.news.savedArticles);

    // Check if article is saved
    const isArticleSaved = savedArticles.some(saved => saved.url === article.url);

    // Set header title and save button
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: article.source.name,
            headerRight: () => (
                <PaperIconButton
                    icon={isArticleSaved ? "bookmark" : "bookmark-outline"}
                    iconColor="#ffffff"
                    size={24}
                    onPress={toggleSaveArticle}
                    style={styles.saveButton}
                />
            ),
        });
    }, [navigation, article, isArticleSaved]);

    // Toggle save article
    const toggleSaveArticle = () => {
        if (isArticleSaved) {
            dispatch(unsaveArticle(article));
        } else {
            dispatch(saveArticle(article));
        }
    };

    // Open original article in browser
    const openOriginalArticle = () => {
        if (article.url) {
            Linking.openURL(article.url);
        }
    };

    // Share article
    const shareArticle = () => {
        if (article.url) {
            Linking.openURL(`https://wa.me/?text=${article.title} - ${article.url}`);
        }
    };

    return (
        <ScrollView 
        style={styles.container}
        testID="screen-Detail"
      >
            <Card style={styles.card}>
                {article.urlToImage && (
                    <Card.Cover
                        source={{ uri: article.urlToImage }}
                        style={styles.image}
                    />
                )}
                <Card.Content style={styles.content}>
                    <Title style={styles.title}>{article.title}</Title>

                    <View style={styles.metaContainer}>
                        <Chip icon="calendar" style={styles.chip}>
                            {format(new Date(article.publishedAt), "dd/MM/yyyy")}
                        </Chip>
                        <Chip icon="clock" style={styles.chip}>
                            {format(new Date(article.publishedAt), "HH:mm")}
                        </Chip>
                    </View>

                    <Divider style={styles.divider} />

                    <Paragraph style={styles.contentText}>
                        {article.content || article.description || "Contenido no disponible"}
                    </Paragraph>

                    <Divider style={styles.divider} />

                    <View style={styles.infoContainer}>
                        <Paragraph style={styles.infoLabel}>
                            Autor:
                        </Paragraph>
                        <Paragraph style={styles.infoValue}>
                            {article.author || "Desconocido"}
                        </Paragraph>

                        <Paragraph style={styles.infoLabel}>
                            Fuente:
                        </Paragraph>
                        <Paragraph style={styles.infoValue}>
                            {article.source.name}
                        </Paragraph>
                    </View>
                </Card.Content>

                <Card.Actions style={styles.cardActions}>
                    <Button
                        mode="contained"
                        onPress={openOriginalArticle}
                        color={theme.colors.primary}
                        icon="open-in-new"
                        style={styles.actionButton}
                    >
                        Ver post
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={shareArticle}
                        color={theme.colors.primary}
                        icon="share"
                        style={styles.actionButton}
                    >
                        Compartir
                    </Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    card: {
        margin: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        height: 220,
    },
    content: {
        paddingVertical: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: "row",
        marginTop: 8,
        flexWrap: 'wrap',
    },
    chip: {
        marginRight: 8,
        marginBottom: 8,
    },
    divider: {
        marginVertical: 16,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
    },
    infoContainer: {
        marginTop: 8,
    },
    infoLabel: {
        fontWeight: "bold",
        marginTop: 8,
        color: "#555",
    },
    infoValue: {
        marginLeft: 8,
    },
    cardActions: {
        justifyContent: "space-around",
        padding: 16,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    saveButton: {
        marginRight: 8,
    },
});

export default DetailScreen;
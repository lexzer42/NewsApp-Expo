import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Animated } from 'react-native';

const AnimatedCard = Animated.createAnimatedComponent(Card);

const SkeletonCard = () => {
    const opacity = React.useRef(new Animated.Value(0.5)).current;
    const placeholderColor = '#BDBDBD';

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.8, 
                    duration: 800, 
                    useNativeDriver: false,
                }),
                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 800,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <AnimatedCard style={styles.card}>
            <View style={[styles.image, { backgroundColor: placeholderColor }]} />
            <Card.Content>
                <Animated.View style={[styles.title, { backgroundColor: placeholderColor, opacity }]} />
                <View style={styles.metaContainer}>
                    <Animated.View style={[styles.chip, { backgroundColor: placeholderColor, opacity }]} />
                    <Animated.View style={[styles.date, { backgroundColor: placeholderColor, opacity }]} />
                </View>
                <Animated.View style={[styles.description, { backgroundColor: placeholderColor, opacity }]} />
                <Animated.View style={[styles.description, { backgroundColor: placeholderColor, width: '70%', opacity }]} />
            </Card.Content>
        </AnimatedCard>
    );
};

const SkeletonLoading = () => {
    return (
        <View style={styles.container}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        height: 180,
    },
    title: {
        height: 24,
        borderRadius: 4,
        marginTop: 12,
        marginBottom: 8,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    chip: {
        width: 100,
        height: 24,
        borderRadius: 12,
    },
    date: {
        width: 70,
        height: 24,
        borderRadius: 4,
    },
    description: {
        height: 16,
        borderRadius: 4,
        marginTop: 8,
    },
});

export default SkeletonLoading;
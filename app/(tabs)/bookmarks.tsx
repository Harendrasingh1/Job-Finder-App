import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useBookmarks } from '@/context/BookmarkContext';
import JobCard from '@/components/JobCard';
import { FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

export default function BookmarksScreen() {
  const { bookmarkedJobs, loading } = useBookmarks();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2f95dc" />
        <Text style={styles.loadingText}>Loading bookmarks...</Text>
      </View>
    );
  }

  const EmptyBookmarks = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="bookmark-o" size={60} color="#ccc" />
      <Text style={styles.emptyText}>No bookmarked jobs</Text>
      <Text style={styles.emptySubText}>Jobs you bookmark will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedJobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={
          bookmarkedJobs.length === 0 ? styles.listEmptyContainer : styles.listContainer
        }
        ListEmptyComponent={EmptyBookmarks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 8,
  },
  listEmptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#666',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
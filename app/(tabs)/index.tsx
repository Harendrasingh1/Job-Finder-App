import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, View as NativeView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { fetchJobs } from '@/services/JobService';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import { FontAwesome } from '@expo/vector-icons';

export default function JobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadJobs = useCallback(async (pageNumber: number, refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNumber === 1) {
        setLoading(true);
      }
      
      setError(null);
      const response = await fetchJobs(pageNumber);
      
      // Filter out jobs with undefined id
      const validJobs = response.results.filter(job => job && job.id !== undefined);
      
      if (validJobs.length === 0) {
        setHasMore(false);
      } else {
        if (refresh || pageNumber === 1) {
          setJobs(validJobs);
        } else {
          setJobs(prevJobs => [...prevJobs, ...validJobs]);
        }
        setPage(pageNumber);
      }
    } catch (err) {
      setError('Failed to load jobs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadJobs(1);
  }, [loadJobs]);

  const handleRefresh = () => {
    setHasMore(true);
    loadJobs(1, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadJobs(page + 1);
    }
  };

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="briefcase" size={60} color="#ccc" />
      <Text style={styles.emptyText}>No jobs found</Text>
      <Text style={styles.emptySubText}>Pull down to refresh</Text>
    </View>
  );

  const ErrorComponent = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="exclamation-circle" size={60} color="#ff6b6b" />
      <Text style={styles.errorText}>{error}</Text>
      <Text style={styles.emptySubText}>Pull down to try again</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading || jobs.length === 0) return null;
    
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color="#2f95dc" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {error ? (
        <ErrorComponent />
      ) : (
        <FlatList
          data={jobs}
          renderItem={({ item }) => <JobCard job={item} />}
          keyExtractor={item => (item.id !== undefined ? item.id.toString() : Math.random().toString())}
          contentContainerStyle={jobs.length === 0 ? styles.listEmptyContainer : styles.listContainer}
          ListEmptyComponent={!loading ? EmptyComponent : null}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={handleRefresh}
              colors={['#2f95dc']} 
            />
          }
        />
      )}
      
      {loading && jobs.length === 0 && !error && (
        <View style={[styles.loadingOverlay, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}>
          <ActivityIndicator size="large" color="#2f95dc" />
          <Text style={styles.loadingText}>Loading jobs...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingVertical: 8,
  },
  listEmptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#ff6b6b',
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

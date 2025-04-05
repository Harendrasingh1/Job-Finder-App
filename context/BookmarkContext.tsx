import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '@/types/job';

interface BookmarkContextProps {
  bookmarkedJobs: Job[];
  isBookmarked: (jobId: number) => boolean;
  toggleBookmark: (job: Job) => Promise<void>;
  loading: boolean;
}

const BookmarkContext = createContext<BookmarkContextProps>({
  bookmarkedJobs: [],
  isBookmarked: () => false,
  toggleBookmark: async () => {},
  loading: true,
});

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarkedJobs');
        if (storedBookmarks) {
          setBookmarkedJobs(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  const saveBookmarks = async (jobs: Job[]) => {
    try {
      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(jobs));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  };

  const isBookmarked = (jobId: number) => {
    return bookmarkedJobs.some(job => job.id === jobId);
  };

  const toggleBookmark = async (job: Job) => {
    let updatedBookmarks;
    
    if (isBookmarked(job.id)) {
      updatedBookmarks = bookmarkedJobs.filter(j => j.id !== job.id);
    } else {
      const jobWithBookmark = { ...job, is_bookmarked: true };
      updatedBookmarks = [...bookmarkedJobs, jobWithBookmark];
    }
    
    setBookmarkedJobs(updatedBookmarks);
    await saveBookmarks(updatedBookmarks);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedJobs, isBookmarked, toggleBookmark, loading }}>
      {children}
    </BookmarkContext.Provider>
  );
};
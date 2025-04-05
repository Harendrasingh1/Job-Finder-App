import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Job } from '@/types/job';
import { useBookmarks } from '@/context/BookmarkContext';
import { Linking } from 'react-native';

export default function JobDetailsScreen() {
  const { id, data } = useLocalSearchParams<{ id: string, data: string }>();
  const job: Job = JSON.parse(data);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const router = useRouter();
  
  const bookmarked = isBookmarked(Number(id));
  
  const handleBookmark = () => {
    toggleBookmark(job);
  };
  
  const handleCall = () => {
    Linking.openURL(`tel:${job.whatsapp_no}`);
  };
  
  const handleWhatsApp = () => {
    const message = `Hi, I am interested in the job "${job.title}" that I saw on the Jobs app.`;
    const encodedMessage = encodeURIComponent(message);
    Linking.openURL(`whatsapp://send?phone=${job.whatsapp_no}&text=${encodedMessage}`);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Job Details',
          headerRight: () => (
            <TouchableOpacity style={styles.bookmarkBtn} onPress={handleBookmark}>
              <FontAwesome 
                name={bookmarked ? "bookmark" : "bookmark-o"} 
                size={24} 
                color={bookmarked ? "#2f95dc" : "#666"} 
              />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container}>
        {job.creatives?.length > 0 && (
          <Image 
            source={{ uri: job.creatives[0].file }} 
            style={styles.headerImage} 
            resizeMode="cover"
          />
        )}
        
        <View style={styles.content}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.company}>{job.company_name}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <FontAwesome name="map-marker" size={18} color="#666" />
              <Text style={styles.detailText}>{job.primary_details.Place}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <FontAwesome name="money" size={18} color="#666" />
              <Text style={styles.detailText}>{job.primary_details.Salary}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <FontAwesome name="briefcase" size={18} color="#666" />
              <Text style={styles.detailText}>{job.primary_details.Job_Type}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <FontAwesome name="graduation-cap" size={18} color="#666" />
              <Text style={styles.detailText}>{job.primary_details.Qualification}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <FontAwesome name="history" size={18} color="#666" />
              <Text style={styles.detailText}>{job.primary_details.Experience}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Description</Text>
            <Text style={styles.description}>{job.other_details || 'No detailed description provided.'}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <Text style={styles.category}>{job.job_category}</Text>
          </View>
        </View>
        
        <View style={styles.contactButtonsContainer}>
          <TouchableOpacity style={[styles.contactButton, styles.callButton]} onPress={handleCall}>
            <FontAwesome name="phone" size={20} color="white" />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.contactButton, styles.whatsappButton]} onPress={handleWhatsApp}>
            <FontAwesome name="whatsapp" size={20} color="white" />
            <Text style={styles.buttonText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bookmarkBtn: {
    padding: 10,
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  company: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  category: {
    fontSize: 16,
    color: '#444',
    backgroundColor: '#e7f3fe',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  contactButtonsContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  callButton: {
    backgroundColor: '#2f95dc',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
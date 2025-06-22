import { Stack } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';
// import { Button, TextInput } from '@expo/ui/swift-ui';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
} from 'react-native';
import { BookList } from '~/books';

// Badge Component
const Badge = ({ text }: { text: string }) => {
  return (
    <View className="mb-4 self-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2">
      <Text className="text-md self-center font-medium text-[#D97706]">{text}</Text>
    </View>
  );
};

export default function Home() {
  const [searchBook, setSearchBook] = useState('');
  const [books, setBooks] = useState<BookList | null>(null);
  const maxResults = 10; // You can adjust this value as needed

  const handleSearch = async () => {
    try {
      // fetch books from API or perform search logic
      console.log('Searching for:', searchBook);

      if (!searchBook.trim()) {
        console.log('Search term is empty');
        return;
      }

      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY;
      console.log('API Key exists:', !!apiKey);

      if (!apiKey) {
        console.error('API key is not set');
        return;
      }

      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchBook)}&maxResults=${maxResults}&key=${apiKey}`;
      console.log('Making request to:', url);

      const res = await fetch(url);
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Close the keyboard and clear the search input
      Keyboard.dismiss();
      setSearchBook(''); // Clear the search input after submission

      const data: BookList = await res.json();
      // console.log('Response data:', JSON.stringify(data, null, 2));

      if (data.items && data.items.length > 0) {
        console.log(`Found ${data.items.length} books`);
        setBooks(data);
        // data.items.forEach((item: Item, index: number) => {
        //   console.log(`Book ${index + 1}:`, item.volumeInfo?.title || 'No title available');
        // });
      } else {
        console.log('No books found');
      }
    } catch (error) {
      console.error('Error searching for books:', error);
    }
  };
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
        style={{ flex: 1 }}>
        <View className="flex-1 bg-white p-4">
          <Badge text="Keep track of your books" />
          <TextInput
            className="mb-4 w-full self-center rounded-lg border border-gray-300 bg-white px-4 py-2"
            onChangeText={(text) => setSearchBook(text)}
            value={searchBook}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
            placeholder="Enter book title..."
          />
          {books && books.items && books.items.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={books.items}
              renderItem={({ item }) => (
                <View className="flex-row items-center gap-2 border-b border-gray-200 p-4">
                  <Image
                    source={{
                      uri:
                        item.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
                    }}
                    contentFit="cover"
                    style={{ width: 50, height: 75 }}
                  />
                  <View>
                    <Text className="text-lg font-semibold">{item.volumeInfo?.title}</Text>
                    <Text className="text-sm text-gray-600">
                      {item.volumeInfo?.authors?.join(', ') || 'Unknown Author'}
                    </Text>
                    <Text>{item.volumeInfo?.publishedDate}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 80 }}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-center text-gray-500">No books found</Text>
            </View>
          )}
          <TouchableOpacity
            className="absolute bottom-4 left-4 right-4 rounded-lg bg-orange-500 py-3"
            onPress={handleSearch}>
            <Text className="text-center text-xl font-semibold text-white">Search Book</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

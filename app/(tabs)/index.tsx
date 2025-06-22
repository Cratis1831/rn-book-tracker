import { Stack } from 'expo-router';
// import { Button, TextInput } from '@expo/ui/swift-ui';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// Badge Component
const Badge = ({ text }: { text: string }) => {
  return (
    <View className="mb-4 self-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2">
      <Text className="text-md self-center font-medium text-[#D97706]">{text}</Text>
    </View>
  );
};

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="flex-1 bg-white">
          <View className="flex-1 justify-between p-4">
            <View className="gap-4">
              <Badge text="Keep track of your books" />

              <TextInput
                className="w-full self-center rounded-lg border border-gray-300 bg-white px-4 py-2"
                onChangeText={() => {}}
                placeholder="Enter book title..."
              />
            </View>
            <TouchableOpacity
              className="w-full rounded-lg bg-orange-500 py-3"
              onPress={() => console.log('Pressed')}>
              <Text className="text-center text-xl font-semibold text-white">Add a Book</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

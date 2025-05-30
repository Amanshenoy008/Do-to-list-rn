import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen 
          name="task/[id]" 
          options={{
            headerTitle: "Edit Task",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#F8F9FA'
            }
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}
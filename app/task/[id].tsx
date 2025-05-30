import { data } from '@/data/todos';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [task, setTask] = useState({ title: '', completed: false });

  useEffect(() => {
    const foundTask = data.find(t => t.id.toString() === id);
    if (foundTask) {
      setTask(foundTask);
    }
  }, [id]);

  const handleSave = () => {
    // In a real app, you would update the task in your data store here
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            style={styles.input}
            value={task.title}
            onChangeText={(text) => setTask(prev => ({ ...prev, title: text }))}
            placeholder="Enter task title"
            placeholderTextColor="#A0AEC0"
          />
        </View>

        <Pressable
          style={styles.statusButton}
          onPress={() => setTask(prev => ({ ...prev, completed: !prev.completed }))}
        >
          <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
            {task.completed && <Feather name="x\" size={16} color="white" />}
          </View>
          <Text style={styles.statusText}>
            {task.completed ? 'Completed' : 'Mark as completed'}
          </Text>
        </Pressable>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A202C',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4C1D95',
    borderColor: '#4C1D95',
  },
  statusText: {
    fontSize: 16,
    color: '#2D3748',
  },
  saveButton: {
    backgroundColor: '#4C1D95',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4C1D95',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
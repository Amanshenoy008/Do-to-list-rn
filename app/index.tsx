import { data } from '@/data/todos';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEY = '@todos';

export default function Index() {
  const [text, setText] = useState('');
  const [todoData, setTodoData] = useState(data);
  const router = useRouter();

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todoData]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos !== null) {
        setTodoData(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todoData));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const deleteOperation = (toBeDeleted: any) => {
    setTodoData(prev => prev.filter(item => item.id !== toBeDeleted));
  };

  const createOperation = (text: string) => {
    if (text.trim() === '') {
      return;
    }
    const newTodo = {
      id: Math.random(),
      title: text,
      completed: false
    };
    setTodoData(prev => [newTodo, ...prev]);
    setText('');
  };

  const updateStatus = (id: number, completed: boolean) => {
    setTodoData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !completed } : item
      )
    );
  };

  const renderTodoItem = ({ item }) => (
    <Pressable
      style={styles.todoItem}
      onPress={() => router.push(`/task/${item.id}`)}
    >
      <View style={styles.todoContent}>
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
          onPress={(e) => {
            e.stopPropagation();
            updateStatus(item.id, item.completed);
          }}
        >
          {item.completed && <Feather name="x" size={16} color="white" />}
        </TouchableOpacity>
        <Text style={[
          styles.todoText,
          item.completed && styles.todoTextCompleted
        ]}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          deleteOperation(item.id);
        }}
        style={styles.deleteButton}
      >
        <Feather name="trash-2" size={20} color="#FF5A5A" />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          animated={true}
          backgroundColor="#F8F9FA"
          barStyle="dark-content"
        />
        <View style={styles.header}>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>
            {todoData.filter(t => !t.completed).length} tasks remaining
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Add a new task..."
            placeholderTextColor="#A0AEC0"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              createOperation(text);
              Keyboard.dismiss();
            }}
          >
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={todoData}
          renderItem={renderTodoItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
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
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4C1D95',
    borderRadius: 12,
    justifyContent: 'center',
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
  listContainer: {
    paddingBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  todoText: {
    fontSize: 16,
    color: '#2D3748',
    flex: 1,
  },
  todoTextCompleted: {
    color: '#A0AEC0',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
});
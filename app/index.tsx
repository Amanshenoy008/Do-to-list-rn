import { data } from '@/data/todos';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  
  const [text,Settext] = useState('')
  const [tododata,Settododata] = useState(data)

  const deleteOperation=(tobedeleted: any)=>{
      Settododata(prev =>prev.filter(item => item.id !== tobedeleted))
  }

  const createOperation = (text:string)=>{
      if (text === '' || text === 'Add todo here...'){
        return alert('Invalid Todo title')
      }
      const newtodo = {
        id: Math.random(),
        title: text,
        description:'incomplete'
      }
      Settododata(prev => [newtodo, ...prev]);
      Settext('Add todo here...')

  }

  const updateStatus = (id,completed)=>{
      Settododata(prev =>
         prev.map(item=> 
            item.id === id ? {...item, completed:!completed}:item)
        )

  }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
  <SafeAreaView style={styles.container}>
    <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          hidden={false}
        />
    <View style={{flex:1}} >
      <View >
        <TextInput
          style={styles.input}
          onChangeText={(text)=>{Settext(text)}}
          value={text}
          placeholder='Add todo here...'
          />
        <Pressable style={({ pressed }) => [
                     styles.button,
                     { 
                       backgroundColor: pressed ? 'rgba(0,0,0,0.5)' : 'rgb(236, 46, 46)',
                       transform: [{ scale: pressed ? 0.97 : 1 }],
                      }
                      ]} 
                    onPress={() => {
                      console.log(text)
                      createOperation(text)
                      Keyboard.dismiss()
                    }}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
      
      <FlatList
        data={tododata}
        renderItem={({item})=>(
          <View style={styles.aligntodos}>
            <TouchableOpacity 
            hitSlop={20}
            onLongPress={(pressed)=>updateStatus(item.id,item.completed)}
            >
             <Text style={ !item.completed ? styles.todotext : styles.todotextwithstrike}  >{item.title}</Text>
            </TouchableOpacity>
          
            <Pressable onPress={()=>{
                                alert('delete pressed')
                                deleteOperation(item.id)
                                }}>
              <MaterialIcons name="delete" color="#ff0000" size={20} />
            </Pressable>

          </View>
        )}
        keyExtractor={item=>item.id.toString()}
        ItemSeparatorComponent={()=><View style={{height:20}}/>}
        contentContainerStyle={{ padding: 10 }}
        scrollEnabled={true}
        />

    </View>
    
  </SafeAreaView>
  </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  aligntodos:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,         
    borderRadius:10,
    
  },
  todotext:{
    letterSpacing:1.5,
    fontSize:16,
    color:'rgba(236, 46, 46,0.7)'

  },
  todotextwithstrike:{
    letterSpacing:1.5,
    fontSize:16,
    color:'green',
    textDecorationLine:'line-through',
    textDecorationColor: 'green',
    textDecorationStyle:'solid'
  },
  button: {
    margin: 12,
    backgroundColor: 'rgb(236, 46, 46)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing:1.5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    letterSpacing:1.5,
    
    
  },
})
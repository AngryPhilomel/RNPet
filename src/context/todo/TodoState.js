import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { ScreenState } from '../screen/ScreenState'
import { ScreenContext } from '../screen/screenContex'

export const TodoState = ({children}) => {
    const initialState = {
        todos: [{ id: '1', title: 'Buy BREAD' }]
    }

    const {changeScreen} = useContext(ScreenContext)

    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = title => dispatch({type: ADD_TODO, title})

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
                  'Deleting element',
                  `You rly sure to delete ${todo.title}`,
                  [{
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => {
                        changeScreen(null)
                        dispatch({type: REMOVE_TODO, id})
                    },
                    style: 'destructive',
                  }  
                ]
                )
        
    }

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

    return (
        <TodoContext.Provider 
            value={{
                todos: state.todos,
                addTodo,
                removeTodo,
                updateTodo
            }}
        >
            {children}
        </TodoContext.Provider>)
}
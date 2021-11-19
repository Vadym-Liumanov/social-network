import state from './redux/state'
import { addPost, updatePost, addDialog, updateDialog } from './redux/state'

import { rerenderEntireTree } from './render'

rerenderEntireTree(state, addPost, updatePost, addDialog, updateDialog)
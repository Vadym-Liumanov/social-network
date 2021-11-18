import state from './redux/state'
import { addPost } from './redux/state'
import { updatePost } from './redux/state'

import { rerenderEntireTree } from './render'

rerenderEntireTree(state, addPost, updatePost)
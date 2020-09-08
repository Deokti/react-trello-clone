import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";

import { Provider } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import store from "./store/index";

import * as serviceWorker from './serviceWorker';


const onDragEnd = () => {
  // Элемент отпущен!

}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <DragDropContext onDragEnd={onDragEnd}>
       <App />
     </DragDropContext>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

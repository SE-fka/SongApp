import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';
import { Provider } from 'react-redux';
import { store } from "./redux/store/store";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);
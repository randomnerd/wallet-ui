import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react';
import rootStore from './store/root';
import Layout from './components/layout';
import registerServiceWorker from './registerServiceWorker';

const root = window.rootStore = new rootStore();
ReactDOM.render(<Provider root={root} router={root.router}><Layout /></Provider>, document.getElementById('root'));
registerServiceWorker();

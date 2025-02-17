import { createRoot } from 'react-dom/client';
import appElem from './App';
import './index.less';

const root = createRoot(document.querySelector('#app'));
root.render(appElem);

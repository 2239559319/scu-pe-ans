import { createRoot, hydrateRoot } from 'react-dom/client';
import appElem from './App';
import './index.less';

declare const __PROD__: boolean;

if (__PROD__) {
  hydrateRoot(document.querySelector('#app'), appElem);
} else {
  const root = createRoot(document.querySelector('#app'));
  root.render(appElem);
}

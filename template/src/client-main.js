import { application, store } from './app';

// prime the store with server-initalized state.
// the state is determined during SSR and inlined in the page markup
store.replaceState(window.INITIAL_STATE);

// actually mount to DOM
application.$mount('#application');

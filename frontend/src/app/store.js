import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from '@redux-devtools/remote';

import user from '../features/UserFeature';

const store = configureStore({
  reducer: {
    user: user
  },
  devTools: false,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    devToolsEnhancer({ 
      name: "My Dashboard",
      realtime: true, 
      hostname: 'redux.dev.manuelselch.de', 
      port: 443,
      secure: true ,
      suppressConnectErrors: false
    })
  ),
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from '@redux-devtools/remote';

import user from '../features/UserFeature';
import taiga from '../features/TaigaFeature';
import projects from '../features/ProjectsFeature';

const store = configureStore({
  reducer: {
    user: user,
    taiga: taiga,
    projects: projects
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

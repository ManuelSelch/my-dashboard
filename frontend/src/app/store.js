import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from '@redux-devtools/remote';

import user from '../features/UserFeature';
import taiga from '../features/TaigaFeature';
import projects from '../features/ProjectsFeature';
import project from '../features/ProjectFeature';

const store = configureStore({
  reducer: {
    user: user,
    taiga: taiga,
    projects: projects,
    project: project
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

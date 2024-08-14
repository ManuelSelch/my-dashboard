import { configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from '@redux-devtools/remote';

import home from '../features/home/HomeFeature';
import project from "../features/project/ProjectFeature";
import projects from '../features/projects/ProjectsFeature';
import taiga from '../features/taiga/TaigaFeature';
import login from '../features/login/LoginFeature';

const store = configureStore({
  reducer: {
    home: home,
    project: project,
    projects: projects,
    taiga: taiga,
    login: login,
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

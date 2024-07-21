import { configureStore } from '@reduxjs/toolkit'

import home from '../features/home/HomeFeature'
import project from "../features/project/ProjectFeature"
import projects from '../features/projects/ProjectsFeature'
import taiga from '../features/taiga/TaigaFeature'
import login from '../features/login/LoginFeature'

export const store = configureStore({
  reducer: {
    home: home,
    project: project,
    projects: projects,
    taiga: taiga,
    login: login
  }
})
import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter
} from 'react-router-dom'
import App from './app'

const rootElement = document.getElementById('app')

render(
  <HashRouter>
    <App />
  </HashRouter>,
  rootElement
)

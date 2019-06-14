import React, { Component } from 'react'
import { request } from '../../lib'
import Layout from '../../layouts/default'
import {
  Menu
} from 'antd'
import Content from './content'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
      selectedKey: '0',
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      type: this.props.match.params.type,
      year: this.props.match.params.year,
      movies: []
    }
  }

  componentDidMount () {
    this._getAllMovies()
  }

  _toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  _selectedItem = ({ key }) => {
    this.setState({
      selectedKey: key
    }, this._getSingleMovie)
  }

  _getAllMovies = () => {
    console.log(window.__LOADING__)
    request(window.__LOADING__)({
      method: 'get',
      url: `/movies/all?type=${this.state.type || ''}&year=${this.state.year || ''}`
    }).then(res => {
      this.setState({
        movies: res
      })
    }).catch(() => {
      this.setState({
        movies: []
      })
    })
  }

  _renderContent = () => {
    const { movies, collapsed } = this.state

    if (!movies || !movies.length) return null

    return (
      <Content
        toggleCollapsed={this._toggleCollapsed}
        collapsed={collapsed}
        movies={movies}
      />
    )
  }

  render () {
    const { years, collapsed, selectedKey } = this.state
    return (
      <Layout {...this.props}>
        <div className='flex-row full'>
          <Menu
            defaultSelectedKeys={[selectedKey]}
            mode='inline'
            inlineCollapsed={collapsed}
            style={{ height: '100%', overflowY: 'scroll', maxWidth: 230 }}
            onSelect={this._selectedItem}
            className='align-self-start'
          >
            {
              years && years.length
                ? years.map((e, i) => (
                  <Menu.Item key={i}>
                    <a href={`/year/${e}`}>{e} 年上映</a>
                  </Menu.Item>
                ))
                : null
            }
          </Menu>
          <div className='flex-1 scroll-y align-self-start'>
            {this._renderContent()}
          </div>
        </div>
      </Layout>
    )
  }
}

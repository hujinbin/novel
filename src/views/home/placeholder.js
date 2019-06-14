import React, { Component } from 'react'
import Line from '../../components/place_line'
import Layout from '../../layouts/default'

export default class Placeholder extends Component {
  render () {
    const menus = Array.from({ length: 20 }).fill(15)
    const contents = Array.from({ length: 8 }).fill(19)
    return (
      <Layout {...this.props}>
        <div className='flex-row full align-self-start'>
          <div style={{ width: 230 }}>
            {menus.map((e, i) => <Line width={200} height={e} key={i} />)}
          </div>
          <div className='flex-1 align-self-start'>
            {contents.map((e, i) => <Line width={(i + 1) * 9 + '%'} height={e} key={i} />)}
          </div>
        </div>
      </Layout>
    )
  }
}

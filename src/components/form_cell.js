import React, { Component } from 'react'

export default class FormCell extends Component {
  render () {
    const { title, children } = this.props
    return (
      <div className='flex-row' style={{ marginTop: 12 }}>
        <span
          style={{
            width: 80,
            marginRight: 6,
            display: 'block',
            whiteSpace: 'nowrap',
            textAlign: 'right',
            fontSize: 13,
            fontWeight: 600
          }}
        >{title}</span>
        {children}
      </div>
    )
  }
}

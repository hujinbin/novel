import React, { Component } from 'react'
import {
  Button,
  Card,
  Tag,
  Row,
  Col,
  Spin,
  Modal,
  Badge,
  Icon
} from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
const { Meta } = Card
import 'moment/locale/zh-cn'

const site = 'http://video.iblack7.com/'
const gridStyle = {
  width: '25%',
  textAlign: 'center',
}
const DPlayer = window.DPlayer

moment.locale('zh-cn')

export default class Content extends Component {
  state = { visible: false }

  _handleClose = (e) => {
    if (this.player && this.player.pause) this.player.pause()
  }

  _showModal = (movie) => {
    this.setState({
      visible: true
    })
    const video = site + movie.videoKey
    const pic = site + movie.coverKey

    if (!this.player) {
      setTimeout(() => {
        this.player = new DPlayer({
          container: document.getElementsByClassName('videoModal')[0],
          screenshot: true,
          autoplay: true,
          video: {
            url: video,
            pic: pic,
            thumbnails: pic
          }
        })
      }, 500)
    } else {
      if (this.player.video.currentSrc !== video) {
        this.player.switchVideo({
          url: video,
          autoplay: true,
          pic: pic,
          type: 'auto'
        })
      }

      this.player.play()
    }
  }
  
  _handleOk = (e) => {
    this.setState({
      visible: false
    })
  }

  _handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

   _jumeToDetail = () => {
    const { url } = this.props
    url && window.open(url)
  }

  _renderContent = () => {
    const { movies } = this.props
    
    return (
      <div style={{ padding: '30px' }}>
        <Row>
          {
            movies.map((it, i) => (
              <Col key={i} xl={{span: 6}} lg={{span: 8}} md={{span: 12}} sm={{span: 24}} style={{ marginBottom: '8px' }}>
                <Card bordered={false}
                  hoverable
                  style={{ width: '100%' }}
                  actions={[
                    <Badge>
                      <Icon style={{marginRight: '2px'}} type="clock-circle" />
                      {moment(it.meta.createdAt).fromNow(true)}前更新
                    </Badge>,
                    <Badge>
                      <Icon style={{marginRight: '2px'}} type="star" />
                      {it.rate} 分
                    </Badge>
                  ]}
                  cover={<img onClick={() => this._showModal(it)} alt="example" src={site + it.posterKey + '?imageMogr2/thumbnail/x1680/crop/1080x1600'} />}>
                  <Meta
                    style={{height: '202px', overflow: 'hidden'}}
                    title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                    onClick={this._jumeToDetail}
                    description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>} />
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal
          className='videoModal'
          footer={null}
          afterClose={this._handleClose}
          visible={this.state.visible}
          onCancel={this._handleCancel}
        >
          <Spin size="large" />
        </Modal>
      </div>
    )
  }

  render () {
    return (
      <div style={{ padding: 10 }}>
        {this._renderContent()}
      </div>
    )
  }
}

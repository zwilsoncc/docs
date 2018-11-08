import { Component } from 'react'
import fetchAPI from '~/lib/fetch-api'

class ChatCount extends Component {
  static defaultProps = {
    chatInterval: 10000
  }

  state = {
    count: null
  }

  componentDidMount() {
    this.timer = setInterval(this.fetchChatCount, this.props.chatInterval)
    this.fetchChatCount()
  }

  componentWillUmount() {
    clearInterval(this.timer)
  }

  fetchChatCount = async () => {
    const count = await getChatCount()
    if (count) {
      this.setState(() => ({ count }))
    }
  }

  render() {
    if (!this.state.count) {
      return null
    }

    return (
      <span className={this.props.className}>
        {this.state.count}
        <style jsx>{`
          span {
            background-color: #333;
            border-radius: 8px;
            color: #eee;
            display: inline-block;
            font-size: 8px;
            font-weight: bold;
            line-height: 11px;
            margin-left: 10px;
            padding: 2px 5px;
            text-align: center;
            transition: all 1s ease;
            vertical-align: middle;
            width: 26px;
          }
        `}</style>
      </span>
    )
  }
}

async function getChatCount() {
  try {
    const { data } = await fetchAPI('/api/v1/chat', null, {
      method: 'POST',
      body: JSON.stringify({
        query: `
        {
          community(slug: "zeit") {
            metaData {
              onlineMembers
              members
            }
          }
        }
      `
      })
    })

    const { community: { metaData: chatData } } = data
    const { onlineMembers } = chatData
    return onlineMembers
  } catch (error) {
    return null
  }
}

export default ChatCount

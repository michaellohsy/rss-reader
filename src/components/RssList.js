import React, { Component } from 'react'

class RssList extends Component {
  constructor(props) {
    super(props)
    this.state = {
       newRssUrl: '',
    }
  }

  onRssUrlEnterChanged = e => {
    this.setState({
      newRssUrl: e.target.value,
    });
  }

  onNewRssUrlEntered = e => {
    e.preventDefault();
    const rssItem = {
      url: this.state.newRssUrl,
      key: `${this.state.newRssUrl}_${new Date().toISOString()}`,
    }
    this.props.onRssItemAdd(rssItem);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onNewRssUrlEntered}>
          <input type="text" value={this.state.newRssUrl} onChange={this.onRssUrlEnterChanged}/>
          <button type="submit">Submit</button>
        </form>
        <ol>
          {this.props.rssItems.map(item => 
            (<li key={item.key}>{item.url}
              <button onClick={(e) => this.props.onRssItemDelete(item)}>Delete</button>
            </li>)
          )}
        </ol>
      </div>
    )
  }
}

export default RssList

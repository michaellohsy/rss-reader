import React, { Component } from 'react';
import styles from './RssFeeds.module.css';

class RssFeeds extends Component {
  constructor(props) {
    super(props)
    this.state = {
       newRssUrl: '',
       errorMessage: '',
    }
  }

  onRssUrlEnterChanged = e => {
    const url = e.target.value;
    const errorMessage = !this.isRssLink(url) ? 'Please entera valid URL' : '';
    this.setState({
      newRssUrl: url,
      errorMessage,
    });
  }

  onNewRssUrlEntered = e => {
    e.preventDefault();
    const rssItem = {
      url: this.state.newRssUrl,
      key: `${this.state.newRssUrl}_${new Date().toISOString()}`,
    };
    this.props.onRssItemAdd(rssItem);
    this.setState({
      newRssUrl: '',
    });
  }

  isRssLink(string) {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return string.match(regex);
  }

  render() {
  const error = this.state.errorMessage ? <div className={styles.error}>{this.state.errorMessage}</div> : '';
    return (
      <div>
        <form onSubmit={this.onNewRssUrlEntered}>
          <input type="text" value={this.state.newRssUrl} onChange={this.onRssUrlEnterChanged}/>
          {error}
          <button type="submit" disabled={this.state.errorMessage}>Submit</button>
        </form>
        <ol>
          {this.props.rssItems.map(item => 
            (<li key={item.key}>{item.url}
              <button onClick={(e) => this.props.onRssItemDelete(item)}>Delete</button>
            </li>)
          )}
        </ol>
      </div>
    );
  }
}

export default RssFeeds

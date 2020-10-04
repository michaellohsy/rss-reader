import React, { Component } from 'react'
import RssList from './RssList';
let Parser = require('rss-parser');

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const ls = require('local-storage');
const rssKey = 'rssKey';

class RssReaderApp extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
       rssItems: [],
    }
    this.parser = new Parser();
  }

  componentDidMount() {
    this.getRssItems();
  }

  getRssItems = () => {
    this.setState({
      rssItems: ls.get(rssKey) || [],
    });
  }

  onRssItemAdd = rssItem => {
    this.setState({
      rssItems: [... this.state.rssItems, rssItem],
      newRssUrl: '',
    }, () => {
      ls.set(rssKey, this.state.rssItems);
    });
  }

  onRssItemDelete = rssItem => {
    const index = this.state.rssItems.map(item => item.key).indexOf(rssItem.key);
    const updatedRssItems = [...this.state.rssItems];
    updatedRssItems.splice(index, 1);
    this.setState({
      rssItems: updatedRssItems,
    }, () => {
      ls.set(rssKey, this.state.rssItems);
    });
  }

  // componentDidMount() {
  //   const url = `${CORS_PROXY}https://www.reddit.com/.rss`;
  //   this.parser.parseURL(url).then(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.err(err);
  //     }
  //   )
  // }

  render() {
    return (
      <div>
        RSS Reader App!
        <RssList 
          rssItems={this.state.rssItems}
          onRssItemAdd={rssItem => this.onRssItemAdd(rssItem)}
          onRssItemDelete={rssItem => this.onRssItemDelete(rssItem)}/>
      </div>
    )
  }
}

export default RssReaderApp

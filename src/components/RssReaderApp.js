import React, { Component } from 'react'
import RssFeeds from './RssFeeds';
import RssArticleViewer from './RssArticleViewer';
import { Container, Row, Col } from 'react-bootstrap';

const Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const ls = require('local-storage');
const rssKey = 'rssKey';

class RssReaderApp extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
       rssFeeds: [],
       articles: [],
    }
    this.parser = new Parser();
  }

  componentDidMount() {
    this.getRssFeeds();
  }

  getRssFeeds = () => {
    this.setState({
      rssFeeds: ls.get(rssKey) || [],
    }, () => this.getArticles(this.state.rssFeeds));
  }

  onRssFeedAdd = rssFeed => {
    this.setState({
      rssFeeds: [... this.state.rssFeeds, rssFeed],
    }, () => {
      ls.set(rssKey, this.state.rssFeeds);
    });
  }

  onRssFeedDelete = rssItem => {
    const index = this.state.rssFeeds.map(item => item.key).indexOf(rssItem.key);
    const updatedRssItems = [...this.state.rssFeeds];
    updatedRssItems.splice(index, 1);
    this.setState({
      rssFeeds: updatedRssItems,
    }, () => {
      ls.set(rssKey, this.state.rssFeeds);
    });
  }

  async getArticles(rssFeeds) {
    const promises = rssFeeds.map(feed => this.parser.parseURL(`${CORS_PROXY}${feed.url}`));
    const res = await Promise.all(promises);
    const articles = res.reduce((prev, cur) => prev.concat(cur.items), []);
    console.log(articles);
    const sample = articles.splice(0,10);
    this.setState({
      articles: sample,
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={12}>
            <h1>RSS Reader App!</h1>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <RssFeeds
            rssItems={this.state.rssFeeds}
            onRssItemAdd={rssItem => this.onRssFeedAdd(rssItem)}
            onRssItemDelete={rssItem => this.onRssFeedDelete(rssItem)}/>
          </Col>
          <Col md={8}>
            <RssArticleViewer
            articles={this.state.articles}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RssReaderApp

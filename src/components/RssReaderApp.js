import React, { Component } from 'react'
import RssFeeds from './RssFeeds';
import RssArticleViewer from './RssArticleViewer';
import AboutMe from './AboutMe';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styles from './RssReaderApp.module.css';

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
       loading: false,
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
      rssFeeds: [...this.state.rssFeeds, rssFeed],
    }, () => {
      ls.set(rssKey, this.state.rssFeeds);
      this.getArticles(this.state.rssFeeds);
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
      this.getArticles(this.state.rssFeeds);
    });
  }

  onRssFeedEnabled = rssItem => {
    const index = this.state.rssFeeds.map(item => item.key).indexOf(rssItem.key);
    const updatedRssItems = [...this.state.rssFeeds];
    updatedRssItems[index].isEnabled = !updatedRssItems[index].isEnabled;
    this.setState({
      rssFeeds: updatedRssItems,
    }, () => {
      ls.set(rssKey, this.state.rssFeeds);
      this.getArticles(this.state.rssFeeds);
    });
  }

  async getArticles(rssFeeds) {
    this.setState({
      loading: true,
    });
    const promises = rssFeeds
      .filter(feed => feed.isEnabled)
      .map(feed => this.parser.parseURL(`${CORS_PROXY}${feed.url}`));
    const res = await Promise.all(promises);
    const articles = res.reduce((prev, cur) => prev.concat(cur.items), []);
    this.setState({
      articles,
      loading: false,
    });
  }

  render() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">RSS Reader</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/about">
            <AboutMe></AboutMe>
          </Route>
          <Route path="/">
            <Container fluid className="pt-2">
            <Row>
              <Col md={3} id="feed-col">
                <RssFeeds
                  rssItems={this.state.rssFeeds}
                  onRssItemAdd={rssItem => this.onRssFeedAdd(rssItem)}
                  onRssItemDelete={rssItem => this.onRssFeedDelete(rssItem)}
                  onRssItemEnabled={rssItem => this.onRssFeedEnabled(rssItem)}
                />
              </Col>
              <Col className={styles.right} md={9}>
                <RssArticleViewer
                  articles={this.state.articles}
                  loading={this.state.loading}
                />
              </Col>
            </Row>
            </Container>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default RssReaderApp

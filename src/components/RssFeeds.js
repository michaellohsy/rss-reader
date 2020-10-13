import React, { Component } from 'react';
import { Button, Col, Form, ListGroup } from 'react-bootstrap';
import styles from './RssFeeds.module.css';
import { Feed } from '../classes/classes';
import { Trash } from 'react-bootstrap-icons';

class RssFeeds extends Component {
  constructor(props) {
    super(props)
    this.state = {
       newRssUrl: '',
       newRssName: '',
       urlError: '',
       nameError: '',
    }
  }

  onRssUrlEnterChanged = e => {
    const url = e.target.value;
    const item = this.props.rssItems.find(item => item.url === url);
    let errorMessage = '';
    if(!this.isRssLink(url)) {
      errorMessage = 'Please enter a valid URL';
    } else if (item) {
      errorMessage = 'Feed already exists';
    }
    this.setState({
      newRssUrl: url,
      urlError: errorMessage,
    });
  }

  onRssNameEnterChanged = e => {
    const name = e.target.value;
    const item = this.props.rssItems.find(item => item.name === name);
    const errorMessage = item ? 'Name already taken please enter a different name' : '';
    this.setState({
      newRssName: name,
      nameError: errorMessage,
    });
  }

  onNewRssUrlEntered = e => {
    e.preventDefault();
    const feed = new Feed(this.state.newRssName, this.state.newRssUrl);
    this.props.onRssItemAdd(feed);
    this.setState({
      newRssUrl: '',
      newRssName: '',
    });
  }

  onFeedEnabledChange = item => {
    // console.log(item);
    this.props.onRssItemEnabled(item);
  }

  isRssLink(string) {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return string.match(regex);
  }

  render() {
    const urlError = this.state.urlError ? <div className={`${styles.error} pt-1 pt-1`}>{this.state.urlError}</div> : '';
    const nameError = this.state.nameError ? <div className={`${styles.error} pt-1 pt-1`}>{this.state.nameError}</div> : '';
    return (
      <div>
        <div className={styles.feedTitle}>Feeds</div>
        <Form onSubmit={this.onNewRssUrlEntered} className='pt-3 pb-3'>
          <Form.Row>
            <Col md={12} className="pt-2">
              <Form.Control type="text" value={this.state.newRssUrl} onChange={this.onRssUrlEnterChanged} placeholder="Enter Rss Feed Url" required/>
              {urlError}
            </Col>
            <Col md={12} className="pt-2">
              <Form.Control type="text" value={this.state.newRssName} onChange={this.onRssNameEnterChanged} placeholder="Enter Rss Feed Name" required/>
              {nameError}
            </Col>
            <Col md={12} className="pt-2">
              <Button variant="primary" type="submit" disabled={urlError || nameError} block>Submit</Button>
            </Col>
          </Form.Row>
        </Form>
        <div className={styles.list}>
          <ListGroup>
          {this.props.rssItems.map(item => 
            (<ListGroup.Item key={item.key}>
              <div>
                <span className={styles.feedName}>{item.name}</span>
                <span className={styles.showHideFeed}>
                  <span>{item.isEnabled ? "Hide Feeds" : "Show Feeds"}</span>
                  <Form.Check
                    inline
                    type="checkbox"
                    defaultChecked={item.isEnabled}
                    onChange={() => this.onFeedEnabledChange(item)}
                  />
                </span>
              </div>
              <div>
                <span className={styles.url} title={item.url}>{item.shortenedUrl}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  <Button className={styles.deleteButton} variant="danger" size="sm" onClick={(e) => this.props.onRssItemDelete(item)}><Trash/></Button>
                </span>
              </div>
            </ListGroup.Item>)
          )}
          </ListGroup>
        </div>

      </div>
    );
  }
}

export default RssFeeds

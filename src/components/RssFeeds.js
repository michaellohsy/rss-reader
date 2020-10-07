import React, { Component } from 'react';
import { Button, Col, Form, ListGroup } from 'react-bootstrap';
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
    const errorMessage = !this.isRssLink(url) ? 'Please enter a valid URL' : '';
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
        <div className={styles.feedTitle}>Feeds</div>
        <Form onSubmit={this.onNewRssUrlEntered} className='pt-3 pb-3'>
          <Form.Row>
            <Col md={12} xl={8}>
              <Form.Control type="text" value={this.state.newRssUrl} onChange={this.onRssUrlEnterChanged} placeholder="Enter Rss Feed Url" required/>
            </Col>
            <Col md={12} xl={4}>
              <Button variant="primary" type="submit" disabled={this.state.errorMessage} block>Submit</Button>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={12}>
              {error}
            </Col>
          </Form.Row>
        </Form>

        <div>
          <ListGroup>
          {this.props.rssItems.map(item => 
            (<ListGroup.Item key={item.key}><span className={styles.url}>{item.url}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="danger" size="sm" onClick={(e) => this.props.onRssItemDelete(item)}>Delete</Button>
            </ListGroup.Item>)
          )}
          </ListGroup>
        </div>

      </div>
    );
  }
}

export default RssFeeds

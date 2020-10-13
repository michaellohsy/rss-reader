import React, { Component } from 'react'
import { Col, Form, Pagination, Row } from 'react-bootstrap';
import RssArticle from './RssArticle';

class RssArticleViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
       pageSize: 10,
       page: 1,
       activePage: 1,
       articles: [],
    }
    this.pageSizes = [10, 25, 50, 100];
  }

  onPageChanged = (page) => {
    this.setState({
      page
    });
  }

  onPageSizeChange = (e) => {
    this.setState({
      pageSize: e.target.value
    });
  }

  getPagination = () => {
    const items = [];
    const totalPages = this.props.articles.length % this.state.pageSize ?
      this.props.articles.length / this.state.pageSize + 1 :
      this.props.articles.length / this.state.pageSize;
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === this.state.activePage} onClick={() => this.onPageChanged(i)}>
          {i}
        </Pagination.Item>,
      );
    }
    return items;
  }

  render() {
    const pageArticles = this.props.articles.slice((this.state.page - 1) * this.state.pageSize, this.state.page * this.state.pageSize);
    return (
      <div>
        {pageArticles.map(article =>
          (<RssArticle key={article.guid} article={article}/>)
        )}
        <Row>
          <Col md={8}>
            <Pagination>{this.getPagination()}</Pagination>
          </Col>
          <Col md={4}>
            <Form.Control inline as="select" value={this.state.pageSize} onChange={this.onPageSizeChange} >
              {this.pageSizes.map(p => (<option>{p}</option>))}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }
}

export default RssArticleViewer

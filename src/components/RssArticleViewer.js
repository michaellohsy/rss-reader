import React, { Component } from 'react'
import { Col, Form, Pagination, Row } from 'react-bootstrap';
import RssArticle from './RssArticle';

const pageSizeSelectStyle = {
  display: "flex",
  alignItems: "center",
};

const pageText = {
  textAlign: "center",
};

class RssArticleViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
       pageSize: 10,
       page: 1,
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
        <Pagination.Item key={i} active={i === this.state.page} onClick={() => this.onPageChanged(i)}>
          {i}
        </Pagination.Item>,
      );
    }
    return items;
  }

  render() {
    const pageArticles = this.props.articles.slice((this.state.page - 1) * this.state.pageSize, this.state.page * this.state.pageSize);
    const firstIdx = (this.state.page - 1) * this.state.pageSize + 1;
    const lastIdx = (this.state.page - 1) * this.state.pageSize + this.state.pageSize;
    return (
      <div>
        {pageArticles.map(article =>
          (<RssArticle key={article.guid} article={article}/>)
        )}
        <Row>
          <Col md={4}>
            <Pagination>{this.getPagination()}</Pagination>
          </Col>
          <Col md={4}>
            <div style={pageText}>{`Viewing ${firstIdx} - ${lastIdx} of ${this.props.articles.length}`}</div>
          </Col>
          <Col md={4}>
            <div style={pageSizeSelectStyle}>
              <span>Show&nbsp;&nbsp;</span>
              <Form.Control as="select" value={this.state.pageSize} onChange={this.onPageSizeChange} >
                {this.pageSizes.map(p => (<option>{p}</option>))}
              </Form.Control>
              <span>&nbsp;&nbsp;Feeds</span>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default RssArticleViewer

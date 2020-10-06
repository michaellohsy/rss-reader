import React, { Component } from 'react'

export class RssArticle extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        <h1>{this.props.article.title}</h1>
        <p><a href={this.props.article.link} target="_blank">View</a></p>
        <p>{this.props.article.content}</p>
      </div>
    )
  }
}

export default RssArticle

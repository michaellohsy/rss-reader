import React, { Component } from 'react'
import RssArticle from './RssArticle';

class RssArticleViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
       
    }
  }
  
  render() {
    return (
      <div>
        <p>{this.props.articles.length} articles found</p>
        {this.props.articles.map(article => 
          (<RssArticle key={article.guid} article={article}/>)
        )}
      </div>
    )
  }
}

export default RssArticleViewer

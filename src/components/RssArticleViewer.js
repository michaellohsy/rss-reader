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
        {this.props.articles.map(article => 
          (<RssArticle key={article.guid} article={article}/>)
        )}
      </div>
    )
  }
}

export default RssArticleViewer

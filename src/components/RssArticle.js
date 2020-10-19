import React, { Component } from 'react'
import { Link, BoxArrowUpRight } from 'react-bootstrap-icons';
import styles from './RssArticle.module.css';

export class RssArticle extends Component {
  constructor(props) {
    super(props)
    this.articleDate = new Date(this.props.article.isoDate);
  }
  
  render() {
    return (
      <div className={`${styles.article} pt-2`}>
        <div className="pb-1">
          <span className={styles.title}>{this.props.article.title}</span>
          <span className={`${styles.date} ml-2`}>
            {`${this.articleDate.toDateString()} ${this.articleDate.toLocaleTimeString()}`}
          </span>
          <a href={this.props.article.link} target="_blank" className="ml-2"><BoxArrowUpRight /></a>
        </div>
        <p>{this.props.article.content}</p>
      </div>
    )
  }
}

export default RssArticle

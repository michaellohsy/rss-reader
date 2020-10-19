import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const aboutMeStyle = {
  textAlign: "left",
};

class AboutMe extends Component {
  render() {
    return (
      <Container className="pt-2" style={aboutMeStyle}>
        <Row>
          <Col md={12} >
            <h3>About</h3>
            <p>
              This site is a simple <a target="_blank" href="https://en.wikipedia.org/wiki/RSS#:~:text=RSS%20(RDF%20Site%20Summary%20or,in%20a%20single%20news%20aggregator.">RSS</a> Reader app.
            Most news website or blogs will have one or more RSS Feed, which contains the latest articles on that website.
            Simply include the RSS link into this App and it will display the articles' summary here. An external link to the original site is shown should one decide to peruse the article at length.
            Feeds are stored in your browser's storage - feeds can't be retrieve if using incognito mode or another browser.
            </p>
            <p>
              Websites nowadays are bloated and slow to load due to the large number of advertisements, images and analytics loaded each page.
              While installing an <a target="_blank" href="https://chrome.google.com/webstore/detail/adblock-%E2%80%94-best-ad-blocker/gighmmpiobklfepjocnamgkkbiglidom">ad blocker</a> does circumvent this problem, more and more news sites are preventing us from reading articles till the ad blocker is disabled.
              Sometimes all we want is quick, fuss free summary of the news at a glance and thats where this App comes in! Hope you enjoy the App!
            </p>
            <p>
              This site is created using <a target="_blank" href="https://reactjs.org/">React</a> and <a target="_blank" href="https://react-bootstrap.netlify.app/">ReactBootStrap</a> for styling. Other packages used are noted below:
              <ul>
                <li><a target="_blank" href="https://reactrouter.com/">React Router</a></li>
                <li><a target="_blank" href="https://www.npmjs.com/package/rss-parser">Rss Feed Parser</a></li>
                <li><a target="_blank" href="https://www.npmjs.com/package/local-storage">Browser Local Storage</a></li>
              </ul>

            </p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AboutMe

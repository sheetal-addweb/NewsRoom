import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styled from 'styled-components'

import {
  SectionHeadline
} from '../styles/shared.ts'

const Container = styled.div`
  margin: 1rem;
`

const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  width: 100%;
`

const Publication = styled.p`
  //font-size: 80%;
  line-height: 1.1rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
  
`

const Url = styled.a`
  //font-size: 80%;
  margin: 0.5rem 0;
  color: black;
  text-decoration: none;
  
  &:hover{
    color: #023E83;
    text-decoration: underline;
  }
`

const Title = styled.p`
  font-weight: 400;
  margin: 0.5rem 0 0.5rem 0;
`

class MediaPage extends React.Component {
  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const media = get(this, 'props.data.allContentfulMediaLink.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Container>
              {/*- start of breadcrumbs --*/}
              <div className="breadcrumbs">
                  <Link href="/" className="crumb">
                      <i className="home"></i>
                  </Link>
                  <span className="crumb" to="/media">Media</span>
              </div>
              {/*- end of breadcrumbs --*/}
            <SectionHeadline>ACC in the Media</SectionHeadline>
            <ArticleList>
              {media.map(({ node }) => {
                return (
                  <li key={node.slug}>
                      <Publication>{node.publication}</Publication>
                      <Url href={node.mediaUrl} target="_blank" rel="noopener noreferrer" >
                          <Title>{node.mediaTitle}</Title>
                      </Url>
                  </li>
                )
              })}
            </ArticleList>
          </Container>
        </div>
      </Layout>
    )
  }
}

export default MediaPage

export const pageQuery = graphql`
  query MediaPageQuery {
      site {
          siteMetadata {
              title
          }
      }
      allContentfulMediaLink(sort: {fields: [datePublished], order: DESC}) {
          edges {
              node {
                publication
                  mediaUrl
                  mediaTitle
              }
          }
      }
  }
`

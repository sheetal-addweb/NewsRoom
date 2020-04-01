import React from 'react'
import {graphql, Link} from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'
import {
    FeatureImage
} from '../styles/shared.ts';

import "../styles/style.css"

class BiographyTemplate extends React.Component {
  render() {
    const biography = get(this.props, 'data.contentfulBiographies')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const bioName = get(this.props, 'data.site.siteMetadata.name')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${biography.title} | ${siteTitle}`} />
            <div className="breadcrumbs">
                <p><i>
                    <Link className="crumb" to="/">Home</Link>
                    |
                    <Link className="crumb" to="/biographies">Biographies</Link>
                    |
                    <span className="crumb"
                        dangerouslySetInnerHTML={{
                            // __html: {biography.content.content},
                            //TODO: change this too be the same as the blog-post page html thingy
                            __html: biography.name,

                        }}
                    />
                </i></p>
            </div>
          <div className={heroStyles.hero}>
            <FeatureImage
                className={heroStyles.heroImage}
                alt={biography.title}
                fluid={biography.thumbnail.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{biography.name}</h1>
            <a href={biography.thumbnail.file.url}>Download a Press Photo of {biography.name}</a>
              <h2 style={{ margin: '1rem 0 0.5rem 0' }}>Media approved quote</h2>
              <i
                  dangerouslySetInnerHTML={{
                      // __html: {biography.content.content},
                      //TODO: change this too be the same as the blog-post page html thingy
                      __html: biography.mediaApprovedQuote?.childMarkdownRemark.html,

                  }}
              />
              <p style={{ margin: '0.5rem 0' }}><strong>Published Work</strong></p>
              <span
                  className="published-work"
                  dangerouslySetInnerHTML={{
                      // __html: {biography.content.content},
                      //TODO: change this too be the same as the blog-post page html thingy
                      __html: biography.publishedWork?.childMarkdownRemark.html,

                  }}
              />

              <div
              dangerouslySetInnerHTML={{
                // __html: {biography.content.content},
                //TODO: change this too be the same as the blog-post page html thingy
                __html: biography.content.childMarkdownRemark.html,

              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BiographyTemplate

export const pageQuery = graphql`
  query GetBiographies($slug: String!) {
    contentfulBiographies(slug: {eq: $slug}) {
      name
      slug
      publishDate(formatString: "MMMM Do, YYYY")
      publishedWork {
          childMarkdownRemark {
            html
            id
          }
          id
        }
      content {
        childMarkdownRemark {
          html
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      thumbnail {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid
            src
        }
        file {
          url
        }
      }
      mediaApprovedQuote {
          childMarkdownRemark {
            html
          }
        }
    }
  }

`

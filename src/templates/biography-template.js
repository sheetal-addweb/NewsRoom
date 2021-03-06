import React from 'react'
import {graphql, Link} from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import Img from 'gatsby-image'

import heroStyles from '../components/hero.module.css'
import {
    SectionHeadline,
} from '../styles/shared.ts';

import "../styles/style.css"
import styled from "styled-components"

const ImageWrapper = styled.div`
  width: calc(100% - 2rem);
    margin: 0 1rem; 
    height: 30rem;
    float: none;
    background-color: #fff;
    
    & a{
      text-decoration: none;
    }

   @media(min-width: 768px){
        width: 50%;
        float: right;
        margin: 0 1rem 1rem 1rem;
  }
`

class BiographyTemplate extends React.Component {
  render () {
    const biography = get(this.props, 'data.contentfulBiographies')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    //TODO: Ask Danny about this
    // const check = () => {
    //       if (biography.mediaApprovedQuote?.childMarkdownRemark.html) = true{
    //           return <div><p>Media approved quote</p></div>
    //       }
    //   }

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${biography.name} | ${siteTitle}`} />
            {/*- start of breadcrumbs --*/}
            <div className="breadcrumbs">
                    <Link href="/" className="crumb">
                        <i className="home"></i>
                    </Link>
                    <Link className="crumb" to="/biographies">Biographies</Link>
                <span className="crumb">
                        <span className="content"
                              dangerouslySetInnerHTML={{
                                  // __html: {biography.content.content},
                                  //TODO: change this too be the same as the blog-post page html thingy
                                  __html: biography.name,

                              }}/>
                    </span>
            </div>
             {/*- end of breadcrumbs --*/}
            <div className="wrapper">
                <SectionHeadline>{biography.name}</SectionHeadline>
            </div>

            <ImageWrapper>
              <a href={biography.thumbnail.file.url}>
                  <Img
                    className={heroStyles.heroImage}
                    alt={biography.title}
                    fluid={biography.thumbnail.fluid}
                />
              </a>
                <a style={{ float: 'right' }} href={biography.thumbnail.file.url}>Download a Press Photo of {biography.name}</a>
            </ImageWrapper>
            <div className="wrapper">
                <div
                    dangerouslySetInnerHTML={{
                        // __html: {biography.content.content},
                        //TODO: change this too be the same as the blog-post page html thingy
                        __html: biography.content.childMarkdownRemark.html,

                    }}
                />
                <p style={{ margin: '0.5rem 0' }}><strong>Media approved quotes:</strong></p>
              <i
                  dangerouslySetInnerHTML={{
                      // __html: {biography.content.content},
                      //TODO: change this too be the same as the blog-post page html thingy
                      __html: biography.mediaApprovedQuote?.childMarkdownRemark.html,

                  }}
              />
              <p style={{ margin: '0.5rem 0' }}><strong>Published Work:</strong></p>
              <span
                  className="published-work"
                  dangerouslySetInnerHTML={{
                      // __html: {biography.content.content},
                      //TODO: change this too be the same as the blog-post page html thingy
                      __html: biography.publishedWork?.childMarkdownRemark.html || "Sorry there is no published work yet",

                  }}
              />

                <div style={{clear: 'both', display: 'block', width:'100%'}}/>

            </div>
        </div>
      </Layout>
    )
  }
}

export default BiographyTemplate

export const pageQuery = graphql`
  query GetBiographies($slug: String!) {
      site {
          siteMetadata {
              title
          }
      }
      contentfulBiographies(slug: {eq: $slug}) {
      name
      slug
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

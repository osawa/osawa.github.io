import * as React from "react"
import { Link, graphql } from "gatsby"
import tw, { css } from 'twin.macro'

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/tags"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <p tw="text-sm font-medium">
        共有しやすいメモとしてのテキスト群<br />
        Warhammer Age of Sigmar (AoS), Warhammer 40,000 (40k), React, etc
      </p>
      <Bio />
      <ol tw="m-0 list-none">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          let draft = post.frontmatter.draft || false
          let tags = post.frontmatter.tags
          if (draft !== true) {
            return (
              <li key={post.fields.slug} css={articleStyles}>
                {/* TODO: コンポーネント化、tag-pageにも使う */}
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  { tags && <Tags data={tags} key="tags" /> }
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          }
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          draft
          tags
        }
      }
    }
  }
`

const articleStyles = css`
  ${tw`m-0 py-8 border-b border-gray-400`}
`
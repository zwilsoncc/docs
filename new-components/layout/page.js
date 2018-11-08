import { Component } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { FONT_FAMILY_SANS } from './css-config'

export default class Page extends Component {
  static contextTypes = {
    darkBg: PropTypes.bool
  }

  static getChildContext() {
    return {
      darkBg: this.props.darkBg || false
    }
  }

  render() {
    return (
      <div className="page" itemScope itemType="http://schema.org/WebPage">
        {this.props.children}
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
            html {
              height: 100%;
              box-sizing: border-box;
            }

            *,
            *:before,
            *:after {
              box-sizing: inherit;
            }

            a {
              -webkit-tap-highlight-color: rgba(0,0,0,0);
            }

            body {
              font-family: ${FONT_FAMILY_SANS};
              margin: 0;
              min-height: 100%;
              position: relative;
              text-rendering: optimizeLegibility;
            }

            html, body {
              background-color: ${this.props.darkBg ? '#000' : '#fff'};
              color: ${this.props.darkBg ? '#fff' : '#000'};
            }

            .page {
              margin: 0 auto;
              max-width: 100%;
              position: relative;
            }

            ${this.props.darkBg
              ? `
              ::selection {
                background-color: #f81ce5;
                color: #fff;
              }
            `
              : `
              ::selection {
                background-color: #79FFE1;
                color: #000;
              }
            `}
          `
            }}
          />
        </Head>
      </div>
    )
  }
}

import App, { Container } from 'next/app'
import React from 'react'
import authenticate from '../lib/authenticate'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    const req = ctx.req

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const { user } = await authenticate({ req })
    return { pageProps, user }
  }

  render() {
    const { Component, pageProps, user } = this.props
    return (
      <Container>
        <Component {...pageProps} user={user} />
      </Container>
    )
  }
}

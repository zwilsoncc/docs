import App, { Container } from 'next/app'
import React from 'react'
import authenticate from '~/lib/authenticate'
import { UserContext } from '~/lib/user-context'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    // const req = ctx.req

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  state = {
    user: {},
    userLoaded: false
  }

  async componentDidMount() {
    const { user } = await authenticate()
    this.setState({
      user,
      userLoaded: true
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <UserContext.Provider value={this.state}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </Container>
    )
  }
}

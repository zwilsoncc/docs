import fetch from 'isomorphic-unfetch'
import React, { Fragment } from 'react'

import Editor from './editor'
import Preview from './preview'

import EXAMPLES from '~/lib/data/now-examples-api'

class Introduction extends React.PureComponent {
  constructor(props) {
    super(props)

    // Randomly select one of the examples
    const exampleNames = Object.keys(EXAMPLES)
    const name = exampleNames[Math.floor(exampleNames.length * Math.random())]

    const files = EXAMPLES[name]

    this.state = {
      files,
      name,
      content: filesToAPIBody(name, files),
      deploying: false,
      errorMessage: null
    }
  }

  onChange = files => {
    this.setState(prevState => {
      let errorMessage
      if (prevState.files['package.json'] !== files['package.json']) {
        try {
          JSON.parse(files['package.json'])
        } catch (err) {
          errorMessage = err.message
        }
      }

      const content = errorMessage
        ? prevState.content
        : filesToAPIBody(prevState.name, files)
      return { files, content, errorMessage }
    })
  }

  setError = errorMessage => {
    this.setState({ errorMessage })
  }

  deploy = async () => {
    try {
      this.setState({ errorMessage: null, deploying: true })

      const response = await fetch('https://api.zeit.co/v3/now/deployments', {
        method: 'POST',
        body: this.state.content
      })

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Failed to deploy:', response.status)
        this.setError('Rate limit exceeded')
        return
      }

      // Ensure we're redirecting to the deployment
      const { url } = await response.json()
      const suffix = url.includes('?redirect=1') ? '' : '?redirect=1'

      window.location = `https://${url + suffix}`
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to deploy', error)
      this.setError('Rate limit exceeded')
    } finally {
      this.setState({ deploying: false })
    }
  }

  render() {
    return (
      <Fragment>
        <Editor
          name={this.state.name}
          files={this.state.files}
          onChange={this.onChange}
          key="1"
        />
        <Preview
          content={this.state.content}
          deploy={this.deploy}
          errorMessage={this.state.errorMessage}
          deploying={this.state.deploying}
          key="2"
        />
      </Fragment>
    )
  }
}

export default Introduction

function filesToAPIBody(name, files) {
  let config = {}
  let deploymentType = 'DOCKER'

  try {
    // Parse the `now.json` file to place it into the `config` of
    // the deployment, similar to what `now-cli` does
    config = JSON.parse(files['now.json'])
  } catch (err) {
    // Ignore…
  }

  try {
    // If there is a package.json file then attempt to use
    // the `name` from there for the deployment name
    const pkg = JSON.parse(files['package.json'])
    name = pkg.name
  } catch (err) {
    // Ignore…
  }

  let json = JSON.stringify(
    {
      name,
      deploymentType,
      public: true,
      config,
      files: []
    },
    null,
    2
  )

  const fileNames = Object.keys(files)
  const filesIndex = json.lastIndexOf('[]')

  // Render the `files` as one-per-line otherwise the API call ends up
  // being rendered very large when the deployment has a few files
  json =
    json.substring(0, filesIndex + 1) +
    '\n' +
    fileNames
      .map((file, i) => {
        return `    { "file": ${JSON.stringify(file)}, "data": ${JSON.stringify(
          files[file]
        )} }${i < fileNames.length - 1 ? ',' : ''}`
      })
      .join('\n') +
    '\n  ' +
    json.substring(filesIndex + 1)

  return json
}

import { Component } from 'react'
import { createPortal } from 'react-dom'

class PortalSubtree extends Component {
  childRootNode = null

  getOrCreateChildRootNode() {
    if (!this.childRootNode) {
      this.childRootNode = document.createElement('div')
      getContainer(this.props.container).appendChild(this.childRootNode)
      if (this.props.onMount) {
        this.props.onMount()
      }
    }

    return this.childRootNode
  }

  render() {
    const childRootNode = this.getOrCreateChildRootNode()

    if (this.props.className) {
      childRootNode.className = this.props.className
    }

    if (this.props.parentId) {
      childRootNode.setAttribute('data-origin-id', this.props.parentId)
    }

    return createPortal(this.props.children, childRootNode)
  }
}

function getContainer(container) {
  return container || document.body
}

export default PortalSubtree

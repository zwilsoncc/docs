import PropTypes from 'prop-types'
import React from 'react'

const ExternalLink = (props, { darkBg = false }) => (
  <svg width="13" height="13" xmlns="http://www.w3.org/2000/svg">
    <g stroke={darkBg ? '#fff' : '#000'} fill="none" fillRule="evenodd">
      <path d="M6.2 6.7l5-5.3" strokeLinecap="square" />
      <g strokeLinecap="square">
        <path d="M7.9.9h4M11.9.9v4" />
      </g>
      <path d="M9.9 7.4v2.5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5c0-1.1.9-2 2-2h2.5" />
    </g>
  </svg>
)

ExternalLink.contextTypes = {
  darkBg: PropTypes.bool
}

export default ExternalLink

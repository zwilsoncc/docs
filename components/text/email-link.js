import React from 'react'

const typeToEmail = {
  abuse: 'abuse@zeit.co',
  support: 'support@zeit.co'
}

const EmailLink = ({ children, type, subject }) => (
  <a
    href={`mailto:${typeToEmail(type)}${
      subject ? `?subject=${encodeURIComponent(subject)}` : ''
    }`}
  >
    {children || type}
  </a>
)

export default EmailLink

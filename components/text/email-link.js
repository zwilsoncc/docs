import React from 'react'
import Link from '~/components/text/link'

const typeToEmail = {
  abuse: 'abuse@zeit.co',
  support: 'support@zeit.co'
}

const EmailLink = ({ children, type, subject }) => (
  <Link
    href={`mailto:${typeToEmail[type]}${
      subject ? `?subject=${encodeURIComponent(subject)}` : ''
    }`}
  >
    {children || type}
  </Link>
)

export default EmailLink

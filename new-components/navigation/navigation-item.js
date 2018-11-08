import Link from 'next/link'
import cn from 'classnames'

const NavigationItem = ({ active, children, className, href }) => (
  <span className={cn({ active }, className)}>
    <Link prefetch href={href}>
      <a>{children}</a>
    </Link>
    <style jsx>{`
      a {
        color: #999;
        display: inline-block;
        font-size: 12px;
        font-weight: normal;
        line-height: 30px;
        padding: 10px;
        text-decoration: none;
        text-transform: uppercase;
        transition: color 0.2s ease;
        vertical-align: middle;
      }

      .active a,
      a:hover {
        color: #000;
      }
    `}</style>
  </span>
)

export default NavigationItem

import cn from 'classnames'

import withType, { WithTypeProps } from '~/lib/with-type'

interface BadgeProps extends WithTypeProps {
  content?: string | React.ReactNode
  children?: React.ReactNode
  className?: string
  size?: 'small' | 'medium'
  outline?: boolean
  uppercase?: boolean
  bold?: boolean
}

const Badge: React.FC<BadgeProps> = ({
  content,
  className,
  size,
  outline,
  uppercase,
  bold,
  children,
  ...props
}) => {
  const classNames = cn(
    'badge',
    {
      small: size === 'small',
      medium: size === 'medium',
      outline,
      uppercase,
      bold
    },
    className
  )

  return (
    <span className={classNames} {...props}>
      {content || children}
      <style jsx>
        {`
          .badge {
            display: inline-block;
            vertical-align: middle;

            color: var(--themed-fg);
            background: var(--themed-bg);
            border: 1px solid var(--themed-border);
            border-radius: 10px;
            padding: 3px 7px;

            font-size: 0.75rem;
            line-height: 1;
            cursor: inherit;
          }

          .badge:not(.geist-themed) {
            --themed-fg: var(--geist-background);
            --themed-bg: var(--geist-foreground);
            --themed-border: var(--themed-bg);
          }

          .badge.medium {
            padding: 3px 5px;
            font-size: 0.6rem;
            font-weight: 500;
          }

          .badge.small {
            padding: 2px 4px;
            font-size: 0.45rem;
            font-weight: 700;
          }

          .badge.outline {
            color: var(--themed-bg);
            background: rgba(0, 0, 0, 0);
          }

          .badge.uppercase {
            text-transform: uppercase;
          }

          .badge.bold {
            font-weight: bold;
          }
        `}
      </style>
    </span>
  )
}

export default withType(Badge, { defaultFill: true })
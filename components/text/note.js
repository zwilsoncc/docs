import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

const Note = ({
  children,
  className,
  hideLabel,
  warning,
  hint,
  alert,
  label,
  ...props
}) => {
  return (
    <div
      className={`note ${cn({ warning, hint, alert }, className)}`}
      {...props}
    >
      {!hideLabel && (
        <b className="note__type">
          {(label && `${label}: `) ||
            (warning && `Warning: `) ||
            (hint && `Hint: `) ||
            (alert && `Alert: `) ||
            `Note: `}
        </b>
      )}

      {children}

      <style jsx>{`
        .note {
          padding: 16px 24px;
          border-radius: 4px;
          border: 1px solid #dddddd;
          font-size: 14px;
          line-height: 1.8;
          margin: 24px 0;
        }

        .note.warning {
          border-color: #ff001f;
        }

        .note.hint {
          border-color: #067df7;
        }

        .note.alert {
          border-color: #f48121;
        }

        .note__type {
          text-transform: uppercase;
          font-weight: 500;
        }

        .note.warning .note__type {
          color: #ff001f;
        }

        .note.hint .note__type {
          color: #067df7;
        }

        .note.alert .note__type {
          color: #f48121;
        }
      `}</style>
    </div>
  )
}

Note.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  warning: PropTypes.bool,
  hint: PropTypes.bool,
  alert: PropTypes.bool,
  label: PropTypes.string
}

export default Note

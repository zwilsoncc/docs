import React, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'

export const GenericAvatar = React.memo(
  ({
    title,
    src,
    size,
    placeholder = false,
    className
  }: {
    title?: string
    src?: string
    size: number
    placeholder?: boolean
    className?: string
  }) => {
    const [ready, setReady] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
      imgRef?.current?.complete && setReady(true)
    }, [])

    return (
      <span
        className={cn('geist-avatar', className)}
        key={src}
        style={{
          width: size,
          height: size
        }}
      >
        {placeholder ? null : (
          <img
            ref={imgRef}
            async
            decoding="async"
            loading="lazy"
            importance="low"
            key={src}
            alt={title}
            title={title}
            src={src}
            width={size}
            height={size}
            onLoad={() => setReady(true)}
            className={ready ? 'ready' : ''}
          />
        )}
        <style jsx>
          {`
            img {
              opacity: 0;
              transition: opacity 0.2s ease-in;
            }

            img.ready {
              opacity: 1;
            }
          `}
        </style>
      </span>
    )
  }
)

interface Props {
  title?: string
  size?: number
  height?: number | string
  boxSize?: number
  teamId?: string
  username?: string
  placeholder?: boolean
  seed?: string
  uid?: string
  hash?: string
  url?: string
  className?: string
}

export const Avatar: React.FC<Props> = React.memo(
  ({
    title,
    size = 80,
    height,
    boxSize = null,
    teamId = null,
    username = null,
    placeholder,
    seed,
    uid,
    hash,
    url,
    className
  }) => {
    const avatarSize = parseInt((height || boxSize || size) as string)

    if (placeholder) {
      if (seed) {
        return (
          <GenericAvatar
            size={avatarSize}
            title={title}
            src={`https://zeit.co/api/www/avatar?seed=${seed}`}
            className={className}
          />
        )
      }
      return (
        <GenericAvatar
          size={avatarSize}
          title={title}
          placeholder
          className={className}
        />
      )
    }
    let query
    const hasSHA = hash && /^[0-9a-f]{40}$/.test(hash)

    if (hasSHA) {
      query = hash
    } else {
      query =
        username != null
          ? `?u=${username}`
          : teamId != null
          ? `?teamId=${teamId}`
          : (uid ? uid : '') + '?'
    }

    const sizePrefix = hasSHA ? '?' : '&'
    const _url =
      url || `https://zeit.co/api/www/avatar/${query + sizePrefix}s=${size * 2}`

    return (
      <GenericAvatar
        size={avatarSize}
        title={title}
        src={_url}
        className={className}
      />
    )
  }
)

export default Avatar
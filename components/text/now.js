import { PRODUCT } from '~/lib/constants'

export default function Now(props) {
  const color = props.color || '#fff'

  return (
    <span className="now" style={{ color }}>
      {PRODUCT}
      <style jsx>
        {`
          span span {
            display: inline-block;
          }
        `}
      </style>
    </span>
  )
}

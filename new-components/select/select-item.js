import cns from 'classnames'
import { MenuItem } from '../menu'
import CheckIcon from '../icons/check'

const SelectItem = ({ children, onClick, selected, value }) => (
  <MenuItem onClick={onClick} value={value}>
    <div className={cns({ selected })}>
      {children}
      {selected && <CheckIcon />}
    </div>
    <style jsx>{`
      div {
        align-items: center;
        display: flex;
        width: 100%;
      }

      div > :global(svg) {
        margin-left: auto;
      }

      .selected {
        color: black;
      }
    `}</style>
  </MenuItem>
)

export default SelectItem

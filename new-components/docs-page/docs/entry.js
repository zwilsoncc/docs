import Context from '../context'
import Observer from '~/new-components/observer'
import getFragmentById from './get-fragment-by-id'

const Entry = ({ children, id }) => {
  return (
    <Context.Consumer>
      {({ onIntersect }) => (
        <Context.Provider value={{ id }}>
          <Observer
            fragment={getFragmentById(id)}
            onIntersect={onIntersect}
            value={id}
          >
            {children}
          </Observer>
        </Context.Provider>
      )}
    </Context.Consumer>
  )
}

export default Entry

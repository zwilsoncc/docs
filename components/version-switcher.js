import Select from './select'

const VersionSwitcher = ({ handleVersionSwitch, version }) => (
  <Select width="100%" onChange={handleVersionSwitch} defaultValue={version}>
    <option value="v2">Latest (v2)</option>
    <option value="v1">Legacy (v1)</option>
  </Select>
)

export default VersionSwitcher

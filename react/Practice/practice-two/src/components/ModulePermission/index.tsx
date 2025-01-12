import CustomTable from '@components/CustomTable'
import { MODULE_PERMISSION } from '@constants/option'
import { memo } from 'react'

const ModulePermission = () => {
  return <CustomTable data={MODULE_PERMISSION} marginTop={10} isLoaded={true} />
}

export default memo(ModulePermission)

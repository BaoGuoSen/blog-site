import { getAllTag } from '@/service/tag'
import { getAllUser } from '@/service/user'
import useAsync from './useAsync'

const useGlobalData = () => {
  const { value: users = [] } = useAsync(getAllUser)
  const { value: tags = [] } = useAsync(getAllTag)

  return {
    userOptions: users.map(({ id, name }) => ({ label: name, value: id })),
    tagOptions: tags.map(({ id, name }) => ({ label: name, value: id }))
  }
}

export default useGlobalData

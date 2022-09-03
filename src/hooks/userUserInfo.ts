import useAsync from './useAsync'
import { getUser } from '@/service/user'

function useUserInfo() {
  const { value } = useAsync(getUser)

  return value
}

export default useUserInfo

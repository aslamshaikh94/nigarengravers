import { useQuery } from '@apollo/client'
import { GET_MAINBANNER_DATA } from '@gqlquery/banner'

export const useGQLQuery = QUERY => {
  const { error, loading, data = {} } = useQuery(QUERY)
  if (loading) {
    console.log('loading data')
    return { loading }
  } else if (error) {
    console.error(error)
    return { loading }
  } else {
    return { loading, data }
  }
}

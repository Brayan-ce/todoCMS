import Home from '@/_PAGES/main/Home/Home'
import { getHomeData } from '@/_PAGES/main/Home/servidor'

export default async function Page() {
  const props = await getHomeData()
  return <Home {...props} />
}

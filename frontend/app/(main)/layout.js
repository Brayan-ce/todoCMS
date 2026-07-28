import ClientShell from '../ClientShell'
import { getSidebarData } from '@/_PAGES/main/Home/servidor'

export default async function MainLayout({ children }) {
  const sidebar = await getSidebarData()
  return <ClientShell sidebar={sidebar}>{children}</ClientShell>
}

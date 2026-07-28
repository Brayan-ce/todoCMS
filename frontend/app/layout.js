import { Quicksand } from 'next/font/google'
import '@/styles/globals.css'
import { ShellProvider } from '@/_EXTRAS/Shell/ShellContext'
import { IdiomasProvider } from '@/_EXTRAS/Idiomas/IdiomasContext'
import Script from "next/script"
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'WhoresHub',
  description: 'WhoresHub - Free HD Porn Videos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.className} suppressHydrationWarning>
      <body className="white">
        <ShellProvider>
          <IdiomasProvider>
            {children}
          </IdiomasProvider>
        </ShellProvider>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.cookie = "csrftoken=ZdR1q2w3e4r5t6y7u8i9o0p; path=/; max-age=86400";
            document.cookie = "sessionid=abc123def456ghi789jkl; path=/; max-age=86400";
          `
        }} />
        <div data-reactroot="" style={{ display: 'none' }} />
        <div dangerouslySetInnerHTML={{ __html: '<!-- django -->' }} style={{ display: 'none' }} />
        <Script
          type="module"
          src="https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/ionicons/ionicons.esm.js"
          strategy="afterInteractive"
        />
        <Script
          nomodule
          src="https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/ionicons/ionicons.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}



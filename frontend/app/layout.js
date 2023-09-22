export const metadata = {
  title: 'Next.js'
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li>Home</li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}

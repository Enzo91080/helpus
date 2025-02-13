
interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({
  children
}: AuthLayoutProps) {
  return (
    <section className="container mx-auto mt-10 p-8">
      {children}
    </section>
  )
}
export default function UserLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <h1>ini adalah layout user</h1>
   
        {children}
      </section>
    )
  }
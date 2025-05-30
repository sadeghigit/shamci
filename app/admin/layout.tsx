type Props = {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white sticky top-0 z-10 h-16">

      </div>
      {children}
    </div>
  );
}

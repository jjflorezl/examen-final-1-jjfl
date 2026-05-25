type EmptyStateProps = {
  message?: string
}

export default function EmptyState({ message = 'No se encontraron dragones.' }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-600 shadow">
      <i className="fa-solid fa-dragon mb-3 text-4xl text-slate-400"></i>
      <p className="text-lg font-semibold">{message}</p>
    </div>
  )
}

export default function AdminPlaceholderPage({ params }: { params: { slug: string[] } }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
      <div className="text-4xl mb-4">🚧</div>
      <h2 className="text-xl font-bold text-white mb-2">Under Construction</h2>
      <p>This module is not yet implemented in the current completion phase.</p>
    </div>
  )
}

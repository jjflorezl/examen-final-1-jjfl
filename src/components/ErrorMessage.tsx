type ErrorMessageProps = {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-center text-red-700 shadow">
      <i className="fa-solid fa-triangle-exclamation mb-3 text-3xl"></i>
      <p className="font-semibold">{message}</p>
    </div>
  )
}

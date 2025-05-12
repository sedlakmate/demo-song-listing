export function ErrorMessage(props: { error: string; onClose: () => void }) {
  return (
    <div className="bg-error text-error-content fixed bottom-4 left-4 z-50 flex max-w-sm items-start justify-between gap-4 rounded-lg p-4 shadow-lg">
      <div className="flex-1">
        <strong className="block font-semibold">Something went wrong</strong>
        <p className="text-sm whitespace-pre-line">{props.error}</p>
      </div>
      <button
        onClick={props.onClose}
        className="btn btn-sm btn-circle btn-ghost text-error-content"
        aria-label="Close error message"
      >
        ✕
      </button>
    </div>
  );
}

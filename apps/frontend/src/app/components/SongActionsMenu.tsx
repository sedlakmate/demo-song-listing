export function SongActionsMenu({
  onDelete,
  onEdit,
}: {
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="dropdown dropdown-end absolute top-2 right-2">
      <button tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
            fill="var(--color-accent)"
          />
        </svg>
      </button>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-200 rounded-box z-[1] w-36 p-2 shadow"
      >
        <li className="hidden">
          <button onClick={onEdit}>Edit</button>
        </li>
        <li>
          <button className="text-error" onClick={onDelete}>
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}

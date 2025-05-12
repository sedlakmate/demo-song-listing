const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';

export function Footer() {
  return (
    <footer className="footer bg-base-200 text-primary flex flex-row items-center justify-start p-4">
      <span className="flex-grow justify-start whitespace-nowrap">
        <a
          href={API_HOST + '/api-docs'}
          className="link link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          API description
        </a>
      </span>
      <span className="text-base-content whitespace-nowrap">&copy; 2025 Máté Sedlák</span>
      <span>
        <a
          href="https://mate-sedlak.com"
          className="link link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          portfolio
        </a>
      </span>
      <span>
        <a
          href="https://mate-sedlak.com/cv"
          className="link link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>
      </span>
    </footer>
  );
}

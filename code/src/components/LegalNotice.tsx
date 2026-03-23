import { Link } from 'react-router';

export function LegalNotice() {
  return (
    <div className="mx-auto max-w-[450px] p-6 font-sans text-text-primary">
      <Link
        to="/"
        className="mb-6 inline-block text-sm text-primary hover:underline"
      >
        &larr; Back to calculator
      </Link>
      <h1 className="mb-4 text-2xl font-bold">Impressum</h1>
      <h2 className="mb-2 mt-6 text-lg font-semibold">
        Angaben gem&auml;&szlig; &sect; 5 TMG
      </h2>
      <p className="text-sm leading-relaxed text-text-secondary">
        Nico Carl
        <br />
        Holzhofstra&szlig;e 3<br />
        81667 M&uuml;nchen
      </p>
      <h2 className="mb-2 mt-6 text-lg font-semibold">Kontakt</h2>
      <p className="text-sm text-text-secondary">
        E-Mail: nicocarl@protonmail.com
      </p>
    </div>
  );
}

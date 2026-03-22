import { Link } from 'react-router';

export function LegalNotice() {
  return (
    <div className="mx-auto max-w-[450px] p-6 font-sans text-text-primary">
      <Link to="/" className="mb-6 inline-block text-sm text-primary hover:underline">
        &larr; Back to calculator
      </Link>
      <h1 className="mb-4 text-2xl font-bold">Impressum</h1>
      <h2 className="mb-2 mt-6 text-lg font-semibold">Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p className="text-sm leading-relaxed text-text-secondary">
        Nico Carl<br />M&uuml;nchen
      </p>
      <h2 className="mb-2 mt-6 text-lg font-semibold">Kontakt</h2>
      <p className="text-sm text-text-secondary">
        E-Mail: nicocarl@protonmail.com
      </p>
      <h2 className="mb-2 mt-6 text-lg font-semibold">Haftung f&uuml;r Inhalte</h2>
      <p className="text-sm leading-relaxed text-text-secondary">
        Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
        verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden
        zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
      </p>
      <h2 className="mb-2 mt-6 text-lg font-semibold">Haftung f&uuml;r Links</h2>
      <p className="text-sm leading-relaxed text-text-secondary">
        Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
        Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen.
      </p>
      <h2 className="mb-2 mt-6 text-lg font-semibold">Urheberrecht</h2>
      <p className="text-sm leading-relaxed text-text-secondary">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
        Urheberrecht.
      </p>
    </div>
  );
}

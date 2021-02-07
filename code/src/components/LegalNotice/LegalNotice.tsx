import { Typography, Link } from '@material-ui/core';
import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '450px',
    align: 'justify',
    textAlign: 'justify',
  },
  text: {
    marginBottom: '15px',
  },
});

export function LegalNotice(): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant="h3">
        Licenses
      </Typography>
      <Typography className={classes.text}>
        The notice document, which attributes the software used to create this
        project can be found <Link href={'notice.txt'}>here</Link>.
      </Typography>
      <Typography className={classes.text} variant="h3">
        Impressum
      </Typography>
      <Typography className={classes.text} variant="h4">
        Angaben gemäß § 5 TMG
      </Typography>
      <Typography className={classes.text} variant="body1">
        Nico Carl
        <br />
        Holzhofstraße 3<br />
        81667 München
      </Typography>
      <Typography className={classes.text} variant="h4">
        Kontakt
      </Typography>
      <Typography className={classes.text} variant="body1">
        E-Mail: nicocarl@protonmail.com
      </Typography>
      <Typography className={classes.text} variant="h5">
        Haftung für Inhalte
      </Typography>
      <Typography className={classes.text} variant="body1">
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen.
      </Typography>
      <Typography className={classes.text} variant="body1">
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </Typography>
      <Typography className={classes.text} variant="h5">
        Haftung für Links
      </Typography>
      <Typography className={classes.text} variant="body1">
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        <br />
        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
        ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
        Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
        entfernen.
      </Typography>
      <Typography className={classes.text} variant="h5">
        Urheberrecht
      </Typography>
      <Typography className={classes.text} variant="body1">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
        sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        <br /> Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
        wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
        Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
        entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
        wir derartige Inhalte umgehend entfernen.
        <br />
        <br />
        Quelle: <Link href="https://www.e-recht24.de">e-recht24.de</Link>
      </Typography>
    </div>
  );
}

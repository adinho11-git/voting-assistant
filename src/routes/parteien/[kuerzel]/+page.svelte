<script lang="ts">
  import type { PageData } from './$types';
  import AppBar from '$lib/components/AppBar.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import ParteiReflection from '$lib/components/ParteiReflection.svelte';
  import { formatDate } from '$lib/mockData';

  export let data: PageData;

  let selectedTopic = '';

  $: p = data.partei;
  $: mitgliederFmt = new Intl.NumberFormat('de-CH').format(p.mitglieder);
  $: if (p.kernthemen.length > 0 && !p.kernthemen.includes(selectedTopic)) {
    selectedTopic = p.kernthemen[0];
  }
  $: selectedTopicDetail = detailForTopic(selectedTopic);

  interface TopicDetail {
    iconPath: string;
    focus: string;
    stance: string;
    counter: string;
    practice: string;
    questions: string[];
  }

  type TopicCopy = Omit<TopicDetail, 'iconPath'>;

  const topicDetailsByParty: Record<string, Record<string, TopicCopy>> = {
    SP: {
      'Soziale Gerechtigkeit': {
        focus: 'Verteilung, Kaufkraft und Schutz vor Armut trotz Arbeit, Krankheit oder Alter.',
        stance:
          'Für die SP ist soziale Gerechtigkeit der Kern ihrer Politik: Wer arbeitet, Kinder betreut, krank wird oder im Alter lebt, soll nicht durch steigende Mieten, Prämien oder Lebenshaltungskosten unter Druck geraten. Die Partei betont deshalb höhere Kaufkraft, starke öffentliche Leistungen und ein Steuersystem, das sehr hohe Einkommen und Vermögen stärker in die Verantwortung nimmt.',
        practice:
          'Bei Abstimmungen fragt die SP, ob eine Vorlage Menschen mit tiefen und mittleren Einkommen konkret entlastet. Sie unterstützt Massnahmen wie Prämienverbilligungen, bezahlbare Kinderbetreuung, stärkere AHV-Leistungen oder Mieterschutz, wenn diese aus ihrer Sicht soziale Sicherheit erhöhen. Skeptisch ist sie bei Vorlagen, die Leistungen abbauen, Kosten privatisieren oder finanzielle Risiken auf Einzelne verschieben.',
        counter:
          'Bürgerliche Parteien kritisieren häufig, dass SP-Lösungen zu mehr Staatsausgaben, höheren Steuern und zusätzlichen Regeln führen. Sie argumentieren, soziale Ziele müssten gezielter verfolgt werden, damit Arbeit, Unternehmertum und Eigenverantwortung nicht geschwächt werden.',
        questions: ['Wer wird konkret entlastet?', 'Wie wird die Massnahme finanziert?', 'Stärkt sie langfristig den sozialen Zusammenhalt?']
      },
      Klimaschutz: {
        focus: 'Klimapolitik mit sozialer Abfederung und klarer Verantwortung für Staat und Wirtschaft.',
        stance:
          'Die SP sieht Klimaschutz als soziale Frage: Klimapolitik soll Emissionen senken, aber Haushalte mit kleinem Budget nicht überfordern. Sie fordert Investitionen in erneuerbare Energien, Gebäudesanierungen, öffentlichen Verkehr und Industrieumbau, kombiniert mit Rückverteilung oder Unterstützung für Menschen, die die Umstellung nicht allein stemmen können.',
        practice:
          'In Abstimmungen unterstützt die SP Klimavorlagen, wenn sie verbindliche Ziele, öffentliche Investitionen und soziale Ausgleichsmechanismen enthalten. Reine Symbolpolitik oder Abgaben ohne Entlastung ärmerer Haushalte beurteilt sie kritischer. Wichtig ist ihr, dass grosse Verursacher stärker beitragen und dass die Transformation gute Arbeitsplätze schafft statt nur Kosten zu verschieben.',
        counter:
          'Kritiker von rechts sagen, die SP verbinde Klimaschutz zu oft mit Ausbau des Staates und neuen Subventionen. Sie warnen vor höheren Energiepreisen, Bürokratie und Belastungen für Gewerbe, Hausbesitzer oder Pendler.',
        questions: ['Sinken Emissionen messbar?', 'Wer trägt die Kosten?', 'Sind tiefe Einkommen geschützt?']
      },
      Gleichstellung: {
        focus: 'Gleiche Chancen, gleiche Rechte und weniger strukturelle Benachteiligung im Alltag.',
        stance:
          'Für die SP bedeutet Gleichstellung mehr als formale Gleichbehandlung. Sie will Lohnungleichheit abbauen, unbezahlte Care-Arbeit sichtbarer machen, Vereinbarkeit von Familie und Beruf verbessern und Diskriminierung aufgrund von Geschlecht, Herkunft, sexueller Orientierung oder Behinderung bekämpfen. Der Staat soll dort eingreifen, wo Märkte oder Institutionen Ungleichheit dauerhaft reproduzieren.',
        practice:
          'Bei Abstimmungen prüft die SP, ob eine Vorlage Zugang zu Bildung, Arbeit, Betreuung, Wohnraum oder politischer Mitsprache fairer macht. Sie unterstützt etwa Elternzeit, bezahlbare Kitas, Lohngleichheitskontrollen oder Antidiskriminierungsregeln, wenn diese aus ihrer Sicht reale Hürden abbauen. Symbolische Gleichstellung ohne wirksame Instrumente reicht ihr meist nicht.',
        counter:
          'Gegner kritisieren, dass solche Politik zu Quoten, Kontrollen und zusätzlicher Regulierung führen könne. Sie argumentieren, Gleichstellung solle primär über Bildung, individuelle Freiheit und freiwillige Lösungen statt über staatliche Vorgaben erreicht werden.',
        questions: ['Welche Benachteiligung wird abgebaut?', 'Ist das Instrument wirksam?', 'Bleibt die Lösung praxistauglich?']
      },
      'AHV-Ausbau': {
        focus: 'Sichere Renten, Solidarität zwischen Generationen und Schutz vor Altersarmut.',
        stance:
          'Die SP betrachtet die AHV als wichtigste soziale Versicherung der Schweiz, weil sie alle einbezieht und besonders tiefe sowie mittlere Einkommen schützt. Sie will Renten sichern oder ausbauen, wenn die Lebenshaltungskosten steigen, und lehnt Kürzungen ab, die vor allem Menschen ohne hohe Pensionskassenleistungen treffen.',
        practice:
          'Bei AHV-Vorlagen achtet die SP darauf, ob die Rentenhöhe real zum Leben reicht und ob die Finanzierung solidarisch verteilt wird. Sie ist eher bereit, höhere Lohnbeiträge oder Beiträge aus grossen Vermögen zu diskutieren, als Rentenaltererhöhungen oder Leistungskürzungen zu akzeptieren. Entscheidend ist für sie, ob eine Reform Altersarmut verhindert statt nur Bundesfinanzen zu entlasten.',
        counter:
          'Bürgerliche Parteien warnen, ein Ausbau der AHV verschärfe die demografische Finanzierungslücke. Sie argumentieren, ohne strukturelle Reformen wie längeres Arbeiten, stärkere zweite Säule oder gezieltere Leistungen würden junge Generationen stärker belastet.',
        questions: ['Reicht die Rente im Alltag?', 'Wer zahlt die Zusatzkosten?', 'Ist die Finanzierung generationengerecht?']
      },
      Mindestlohn: {
        focus: 'Faire Löhne, Schutz vor Lohndumping und Würde von Arbeit.',
        stance:
          'Die SP befürwortet Mindestlöhne dort, wo Erwerbsarbeit nicht vor Armut schützt. Sie argumentiert, dass Vollzeitarbeit ein Leben ohne Sozialhilfe ermöglichen muss und dass tiefe Löhne häufig indirekt von der Allgemeinheit über Ergänzungsleistungen oder Prämienverbilligungen mitfinanziert werden.',
        practice:
          'In Abstimmungen unterstützt die SP gesetzliche oder kantonale Mindestlöhne, wenn Branchenlösungen aus ihrer Sicht zu wenig greifen. Gleichzeitig verweist sie auf Gesamtarbeitsverträge, Kontrollen und flankierende Massnahmen gegen Lohndumping. Bei Ausnahmen achtet sie darauf, ob Lernende, Praktikanten oder Kleinbetriebe fair behandelt werden.',
        counter:
          'Kritiker befürchten, Mindestlöhne könnten Einstiegsjobs, kleine Betriebe und arbeitsintensive Branchen belasten. Sie setzen stärker auf Sozialpartnerschaft, Ausbildung und Produktivität statt auf staatlich festgelegte Lohnuntergrenzen.',
        questions: ['Schützt Arbeit vor Armut?', 'Welche Branchen sind betroffen?', 'Gibt es gute Kontrollen?']
      },
      Wohnbau: {
        focus: 'Bezahlbare Mieten, gemeinnütziger Wohnraum und Schutz vor Verdrängung.',
        stance:
          'Die SP sieht Wohnen als Grundbedürfnis und nicht nur als Marktgut. Sie fordert mehr gemeinnützigen Wohnbau, stärkeren Mieterschutz und Massnahmen gegen spekulative Preissteigerungen, besonders in Städten und Agglomerationen mit hoher Nachfrage.',
        practice:
          'Bei Wohnvorlagen unterstützt die SP Instrumente wie Vorkaufsrechte für Gemeinden, Fördergelder für Genossenschaften, strengere Regeln gegen missbräuchliche Mietzinse oder energetische Sanierungen mit Mieterschutz. Entscheidend ist für sie, ob Menschen in ihrem Quartier bleiben können und ob öffentlicher Boden langfristig bezahlbaren Wohnraum schafft.',
        counter:
          'Bürgerliche Parteien kritisieren, Eingriffe in den Wohnungsmarkt könnten private Investitionen bremsen und Wohnraum verknappen. Sie argumentieren, mehr Angebot entstehe vor allem durch einfachere Bewilligungsverfahren, Verdichtung und weniger Regulierung.',
        questions: ['Sinkt der Mietdruck?', 'Entsteht neuer Wohnraum?', 'Bleiben Sanierungen bezahlbar?']
      }
    },
    GP: {
      Klimakrise: {
        focus: 'Schnelle Emissionssenkung, verbindliche Klimaziele und ökologische Verantwortung.',
        stance:
          'Für die Grünen ist die Klimakrise die zentrale politische Herausforderung. Sie wollen die Schweiz konsequent auf Netto-Null ausrichten, fossile Abhängigkeiten reduzieren und Klimaschutz in Energie, Verkehr, Landwirtschaft, Finanzplatz und Konsum verankern.',
        practice:
          'Bei Abstimmungen unterstützen die Grünen Vorlagen, die verbindliche Ziele, klare Lenkungsinstrumente und Investitionen in erneuerbare Infrastruktur bringen. Kompromisse akzeptieren sie eher, wenn sie realen CO₂-Abbau ermöglichen; reine Freiwilligkeit oder sehr lange Übergangsfristen beurteilen sie kritisch.',
        counter:
          'Kritiker werfen den Grünen vor, Tempo und Eingriffstiefe der Klimapolitik zu unterschätzen. Sie warnen vor höheren Kosten, Verboten und Belastungen für ländliche Regionen, Gewerbe und Pendler.',
        questions: ['Wie stark sinken Emissionen?', 'Ist das Ziel verbindlich?', 'Wer wird beim Übergang unterstützt?']
      },
      Biodiversität: {
        focus: 'Schutz von Lebensräumen, Artenvielfalt und natürlichen Ressourcen.',
        stance:
          'Die Grünen sehen Biodiversität als Grundlage für Landwirtschaft, Wasserqualität, Gesundheit und Lebensqualität. Sie fordern mehr Schutzflächen, ökologische Vernetzung, weniger Pestizide und stärkere Regeln gegen Bodenverbrauch.',
        practice:
          'In Abstimmungen prüfen die Grünen, ob eine Vorlage Naturflächen tatsächlich schützt oder nur freiwillige Absichtserklärungen enthält. Sie unterstützen Förderprogramme und verbindliche Standards, wenn sie Artenvielfalt messbar stärken und Kantone sowie Gemeinden zur Umsetzung verpflichten.',
        counter:
          'Gegner kritisieren, Biodiversitätsvorgaben könnten Landwirtschaft, Bauprojekte und Energieinfrastruktur ausbremsen. Sie fordern mehr Rücksicht auf Eigentumsrechte, Ernährungssicherheit und regionale Handlungsspielräume.',
        questions: ['Welche Lebensräume werden geschützt?', 'Gibt es verbindliche Flächenziele?', 'Wie werden Bauern und Gemeinden eingebunden?']
      },
      'Erneuerbare Energien': {
        focus: 'Solar, Wind, Wasser und Effizienz als Ersatz für fossile Energien.',
        stance:
          'Die Grünen wollen die Energieversorgung klimaneutral, dezentral und naturverträglich gestalten. Erneuerbare Energien sollen rasch ausgebaut werden, aber nicht auf Kosten besonders wertvoller Landschaften oder Biodiversität.',
        practice:
          'Bei Energievorlagen unterstützen die Grünen Solarpflichten, Gebäudesanierungen, Effizienzprogramme und Netzausbau. Bei grossen Wasser- oder Windprojekten wägen sie sorgfältig zwischen Klimanutzen und Naturschutz ab; Atomkraft lehnen sie als teuer, langsam und risikobehaftet ab.',
        counter:
          'Kritiker sagen, die Grünen verlangten gleichzeitig mehr erneuerbare Energie und strengen Landschaftsschutz, was den Ausbau erschwere. Bürgerliche Parteien setzen stärker auf Technologieoffenheit, schnellere Bewilligungen und Versorgungssicherheit.',
        questions: ['Beschleunigt die Vorlage den Ausbau?', 'Bleibt Naturschutz gewahrt?', 'Verbessert sie Versorgungssicherheit?']
      },
      Verkehrswende: {
        focus: 'Mehr ÖV, Veloinfrastruktur und weniger Abhängigkeit vom Auto.',
        stance:
          'Die Grünen wollen Verkehr vermeiden, verlagern und klimafreundlicher machen. Besonders in Städten und Agglomerationen setzen sie auf öffentlichen Verkehr, sichere Velowege, kurze Wege und weniger fossile Mobilität.',
        practice:
          'In Abstimmungen unterstützen die Grünen Investitionen in Bahn, Bus, Nachtzüge, Velowege und Verkehrsberuhigung. Strassen-Ausbauprojekte sehen sie kritisch, wenn sie zusätzlichen Verkehr erzeugen, Boden versiegeln oder Klimaziele untergraben.',
        counter:
          'Gegner kritisieren, eine starke Verkehrswende benachteilige ländliche Regionen und Menschen ohne gute ÖV-Anbindung. Sie betonen Wahlfreiheit, Strassenkapazität und wirtschaftliche Logistik.',
        questions: ['Wird Verkehr klimafreundlicher?', 'Profitieren auch Regionen?', 'Entsteht weniger Bodenverbrauch?']
      },
      'Soziale Ökologie': {
        focus: 'Ökologische Transformation ohne soziale Verlierer.',
        stance:
          'Die Grünen verbinden Umweltpolitik mit sozialer Fairness. Klimaschutz soll nicht nur über Preise funktionieren, sondern mit Rückverteilung, öffentlicher Infrastruktur und Unterstützung für Haushalte, Mieterinnen und Beschäftigte.',
        practice:
          'Bei Abstimmungen achten die Grünen darauf, ob ökologische Massnahmen soziale Ausgleichselemente enthalten. Sie unterstützen Förderprogramme für Gebäudesanierungen, ÖV-Ausbau oder Energieeffizienz, wenn tiefe Einkommen nicht überproportional belastet werden.',
        counter:
          'Kritiker argumentieren, soziale Abfederung mache ökologische Programme teurer und komplexer. Von links kommt manchmal der Vorwurf, Umweltziele seien nicht genug mit Eigentums- und Verteilungsfragen verbunden.',
        questions: ['Ist die Transformation fair?', 'Wer erhält Unterstützung?', 'Sind Klima- und Sozialwirkung verbunden?']
      },
      Tierschutz: {
        focus: 'Tierwohl, nachhaltige Landwirtschaft und ethischer Konsum.',
        stance:
          'Die Grünen wollen Tierwohl stärker rechtlich schützen und Landwirtschaft ökologischer ausrichten. Sie kritisieren industrielle Tierhaltung, lange Transporte und Produktionsweisen, die Klima, Böden oder Wasser belasten.',
        practice:
          'In Abstimmungen unterstützen die Grünen strengere Tierwohlstandards, Transparenz bei Herkunft und Haltung sowie Förderungen für ökologische Betriebe. Bei Importen fordern sie, dass hohe Schweizer Standards nicht durch billigere Produkte unterlaufen werden.',
        counter:
          'Gegner warnen vor höheren Lebensmittelpreisen, zusätzlichem Aufwand für Bauernbetriebe und weniger Auswahl für Konsumentinnen und Konsumenten. Sie setzen stärker auf freiwillige Labels und Marktnachfrage.',
        questions: ['Verbessert sich Tierwohl messbar?', 'Sind Bauernbetriebe unterstützt?', 'Gelten Standards auch für Importe?']
      }
    },
    GLP: {
      'Ökologische Marktwirtschaft': {
        focus: 'Klimaschutz über Innovation, Preise und unternehmerische Lösungen.',
        stance:
          'Die GLP verbindet ökologische Ziele mit liberaler Wirtschaftspolitik. Sie will Umweltkosten stärker in Preise einrechnen, damit klimafreundliche Technologien, effiziente Gebäude und saubere Mobilität wirtschaftlich attraktiver werden.',
        practice:
          'Bei Abstimmungen unterstützt die GLP Instrumente wie Lenkungsabgaben, Emissionshandel, Innovationsförderung oder klare Zielwerte. Sie bevorzugt Lösungen, die Wettbewerb ermöglichen und nicht jedes Detail staatlich vorschreiben.',
        counter:
          'Linke Parteien kritisieren, Marktinstrumente seien oft zu langsam oder zu wenig sozial. Rechte Parteien warnen vor neuen Abgaben und Standortnachteilen.',
        questions: ['Setzt die Vorlage richtige Preissignale?', 'Bleibt Innovation möglich?', 'Gibt es soziale Rückverteilung?']
      },
      'CO₂-Lenkungsabgabe': {
        focus: 'CO₂ verteuern und Einnahmen an Bevölkerung oder Wirtschaft zurückgeben.',
        stance:
          'Für die GLP ist eine CO₂-Lenkungsabgabe ein zentrales Instrument, weil sie Verhalten verändert, ohne pauschal Verbote zu erlassen. Wer mehr Emissionen verursacht, bezahlt mehr; wer klimafreundlich handelt, profitiert über Rückerstattung oder tiefere andere Abgaben.',
        practice:
          'In Abstimmungen achtet die GLP darauf, ob die Abgabe technologieneutral, transparent und wirksam ausgestaltet ist. Entscheidend ist, dass Einnahmen nicht einfach im Staatshaushalt verschwinden, sondern zurückverteilt oder gezielt für Innovation genutzt werden.',
        counter:
          'Kritiker sagen, Lenkungsabgaben könnten Haushalte, Pendler und Unternehmen belasten, bevor echte Alternativen verfügbar sind. Andere bemängeln, dass Preissignale allein die Klimakrise nicht schnell genug lösen.',
        questions: ['Wird CO₂ wirklich reduziert?', 'Wie werden Einnahmen zurückgegeben?', 'Gibt es Alternativen für Betroffene?']
      },
      Digitalisierung: {
        focus: 'Moderner Staat, Datenschutz und digitale Infrastruktur.',
        stance:
          'Die GLP sieht Digitalisierung als Chance für effizientere Verwaltung, bessere Bildung, neue Geschäftsmodelle und mehr Transparenz. Gleichzeitig betont sie Datenschutz, Cybersecurity und digitale Kompetenzen als Voraussetzung für Vertrauen.',
        practice:
          'Bei Abstimmungen unterstützt die GLP digitale Identität, E-Government, offene Schnittstellen und digitale Bildung, wenn Governance und Datenschutz überzeugend geregelt sind. Sie ist kritisch gegenüber Lösungen, die Monopole fördern oder Sicherheitsfragen unterschätzen.',
        counter:
          'Skeptiker warnen vor Überwachung, Abhängigkeit von privaten Plattformen und Ausschluss weniger digitaler Bevölkerungsgruppen. Konservative Stimmen bezweifeln oft Nutzen und Kosten digitaler Grossprojekte.',
        questions: ['Ist Datenschutz gesichert?', 'Wird Verwaltung einfacher?', 'Profitieren auch weniger digitale Personen?']
      },
      Bildung: {
        focus: 'Kompetenzen, Chancengerechtigkeit und lebenslanges Lernen.',
        stance:
          'Die GLP betrachtet Bildung als Standort- und Chancenthema. Sie will Schulen, Berufsbildung, Hochschulen und Weiterbildung so stärken, dass Menschen mit technologischem Wandel, Klimatransformation und Fachkräftemangel umgehen können.',
        practice:
          'In Abstimmungen unterstützt die GLP Investitionen in MINT, digitale Kompetenzen, frühe Förderung und Durchlässigkeit zwischen Berufsbildung und Hochschule. Sie achtet darauf, dass Bildungspolitik messbare Qualität liefert und nicht nur Strukturen ausbaut.',
        counter:
          'Kritiker sagen, Bildungsreformen würden oft teuer, ohne Unterrichtsqualität direkt zu verbessern. Von links kommt der Einwand, liberale Bildungslogik könne soziale Ungleichheit zu wenig korrigieren.',
        questions: ['Stärkt die Vorlage echte Kompetenzen?', 'Verbessert sie Chancengerechtigkeit?', 'Ist Qualität messbar?']
      },
      Raumplanung: {
        focus: 'Verdichtung, Landschaftsschutz und lebendige Siedlungsräume.',
        stance:
          'Die GLP will Zersiedelung begrenzen und gleichzeitig Wohnraum ermöglichen. Sie setzt auf intelligente Verdichtung, gute ÖV-Anbindung, energieeffiziente Gebäude und Schutz wertvoller Landschaften.',
        practice:
          'Bei Abstimmungen unterstützt die GLP Raumplanung, wenn sie Bodenverbrauch senkt und Gemeinden klare, flexible Instrumente gibt. Sie ist skeptisch gegenüber reiner Verhinderungspolitik, wenn dadurch Wohnraum fehlt oder Pendeldistanzen steigen.',
        counter:
          'Gegner kritisieren, Verdichtung könne Quartiere überlasten, Eigentumsrechte beschneiden oder ländliche Gemeinden einschränken. Linke Stimmen fordern oft stärkeren Mieterschutz innerhalb der Verdichtung.',
        questions: ['Verhindert die Vorlage Zersiedelung?', 'Entsteht trotzdem Wohnraum?', 'Ist ÖV-Anbindung mitgedacht?']
      },
      Verkehr: {
        focus: 'Klimafreundliche Mobilität mit Technologie und Wahlfreiheit.',
        stance:
          'Die GLP will Verkehr dekarbonisieren, ohne Mobilität grundsätzlich einzuschränken. Elektromobilität, ÖV, Veloinfrastruktur, Mobility Pricing und digitale Verkehrssteuerung sollen zusammenwirken.',
        practice:
          'In Abstimmungen unterstützt die GLP Verkehrsprojekte, wenn sie Emissionen senken, Engpässe lösen und Kosten fair abbilden. Sie ist kritisch gegenüber pauschalem Strassenausbau, aber auch gegenüber Verbotspolitik ohne praktikable Alternativen.',
        counter:
          'Grüne kritisieren die GLP manchmal als zu auto- und technologieoptimistisch. Rechte Parteien finden Mobility Pricing oder Umweltauflagen oft zu regulierend.',
        questions: ['Sinken Emissionen pro Kilometer?', 'Bleibt Mobilität bezahlbar?', 'Wer bezahlt Infrastruktur fair?']
      }
    },
    Mitte: {
      Familienpolitik: {
        focus: 'Entlastung von Familien, Vereinbarkeit und generationenübergreifender Zusammenhalt.',
        stance:
          'Die Mitte sieht Familien als tragende Struktur der Gesellschaft. Sie setzt auf steuerliche Entlastung, bezahlbare Betreuung, flexible Arbeitsmodelle und Unterstützung für Eltern, ohne Familienpolitik vollständig zu verstaatlichen.',
        practice:
          'Bei Abstimmungen sucht die Mitte oft nach Lösungen, die Familien konkret entlasten und politisch mehrheitsfähig bleiben. Sie unterstützt Kinderabzüge, Betreuungsgutschriften oder Prämienentlastungen, wenn Finanzierung und Umsetzung für Kantone tragbar sind.',
        counter:
          'Linke Parteien kritisieren häufig, Entlastungen über Steuern erreichten tiefe Einkommen zu wenig. Liberale Stimmen warnen vor neuen Ansprüchen und zusätzlicher Bürokratie.',
        questions: ['Welche Familien profitieren?', 'Ist die Lösung kantonal umsetzbar?', 'Bleibt sie finanzierbar?']
      },
      Landwirtschaft: {
        focus: 'Ernährungssicherheit, bäuerliche Betriebe und regionale Verantwortung.',
        stance:
          'Die Mitte ist stark in ländlichen und katholisch geprägten Regionen verankert und betont eine Landwirtschaft, die Versorgung, Landschaftspflege und Familienbetriebe verbindet. Sie unterstützt ökologische Verbesserungen, will aber Produzenten nicht mit zu schnellen Auflagen überfordern.',
        practice:
          'In Abstimmungen achtet die Mitte darauf, ob Bauernbetriebe Planungssicherheit haben und ob neue Umweltstandards praktikabel sind. Sie unterstützt Direktzahlungen, regionale Wertschöpfung und Versorgungssicherheit, wenn gleichzeitig Tierwohl und Ressourcenschutz gestärkt werden.',
        counter:
          'Grüne kritisieren oft zu viel Rücksicht auf bestehende Strukturen; wirtschaftsliberale Parteien kritisieren Subventionen und Marktabschottung. Konsumentenseitig steht zudem die Frage höherer Preise im Raum.',
        questions: ['Bleibt Ernährungssicherheit stark?', 'Sind Auflagen für Betriebe machbar?', 'Verbessert sich Umweltwirkung real?']
      },
      Gesundheit: {
        focus: 'Prämien, Versorgungssicherheit und tragbare Kosten.',
        stance:
          'Die Mitte stellt Gesundheitskosten und Krankenkassenprämien stark ins Zentrum. Sie will Kostenwachstum bremsen, ohne die medizinische Grundversorgung in Regionen zu schwächen. Ihr Ansatz ist meist ausgleichend: Effizienz steigern, Fehlanreize reduzieren, aber Versorgung erhalten.',
        practice:
          'Bei Abstimmungen unterstützt die Mitte Modelle zur Kostendämpfung, bessere Koordination, stärkere Hausarztmedizin und Prämienentlastung, wenn die Finanzierung nicht einseitig auf Bund oder Kantone fällt. Sie ist vorsichtig bei radikalen Systemwechseln.',
        counter:
          'Linke kritisieren, Mitte-Lösungen seien oft zu wenig verbindlich gegen Versicherer oder Pharma. Rechte Parteien warnen vor mehr staatlicher Steuerung und Kostenverlagerung.',
        questions: ['Sinken Prämien spürbar?', 'Bleibt Versorgung regional gesichert?', 'Wer trägt die Kosten?']
      },
      Föderalismus: {
        focus: 'Starke Kantone, lokale Lösungen und nationale Koordination dort, wo nötig.',
        stance:
          'Die Mitte verteidigt den Föderalismus als politisches Gleichgewicht der Schweiz. Kantone und Gemeinden sollen nahe bei den Menschen entscheiden können, aber nationale Koordination ist nötig, wenn Probleme kantonsübergreifend sind.',
        practice:
          'In Abstimmungen prüft die Mitte, ob eine Vorlage Kompetenzen sinnvoll verteilt. Sie unterstützt nationale Standards, wenn sie Versorgung, Sicherheit oder Fairness verbessern, lehnt aber Zentralisierung ab, wenn kantonale Unterschiede gute Lösungen ermöglichen.',
        counter:
          'Linke kritisieren Föderalismus manchmal als Bremse für gleiche Rechte und Standards. Rechte Parteien warnen ebenfalls vor Zentralisierung, verlangen aber oft noch mehr kantonale Freiheit als die Mitte.',
        questions: ['Welche Ebene löst das Problem am besten?', 'Bleibt lokale Mitsprache erhalten?', 'Braucht es nationale Mindeststandards?']
      },
      'KMU-Förderung': {
        focus: 'Gewerbe, Familienunternehmen und weniger administrative Belastung.',
        stance:
          'Die Mitte sieht KMU als Rückgrat vieler Regionen. Sie will Unternehmen entlasten, Ausbildung stärken und Nachfolgen erleichtern, ohne soziale oder ökologische Verantwortung auszublenden.',
        practice:
          'Bei Abstimmungen unterstützt die Mitte Vereinfachungen, Steuererleichterungen oder Förderinstrumente, wenn sie kleinen und mittleren Betrieben tatsächlich helfen. Gleichzeitig achtet sie darauf, dass Arbeitnehmerrechte und regionale Ausgleichsziele nicht unter die Räder kommen.',
        counter:
          'Linke Parteien kritisieren KMU-Förderung, wenn sie zu Steuergeschenken ohne Gegenleistung wird. Liberale Parteien finden Mitte-Kompromisse oft noch zu regulierend oder subventionslastig.',
        questions: ['Hilft es kleinen Betrieben konkret?', 'Wird Bürokratie reduziert?', 'Bleiben soziale Standards gewahrt?']
      },
      Aussenpolitik: {
        focus: 'Stabile Beziehungen, Neutralität und pragmatische internationale Zusammenarbeit.',
        stance:
          'Die Mitte verfolgt eine pragmatische Aussenpolitik: Die Schweiz soll eigenständig bleiben, aber wirtschaftlich, wissenschaftlich und sicherheitspolitisch verlässlich kooperieren. Besonders wichtig sind stabile Beziehungen zur EU und humanitäre Tradition.',
        practice:
          'In Abstimmungen unterstützt die Mitte internationale Abkommen, wenn sie Rechtssicherheit schaffen und Schweizer Interessen wahren. Sie achtet darauf, dass Demokratie, Kantone und Wirtschaft eingebunden sind und dass Neutralität nicht unnötig beschädigt wird.',
        counter:
          'Die SVP kritisiert solche Positionen oft als zu EU-nah. Linke und Grüne kritisieren manchmal, wirtschaftliche Interessen würden Menschenrechte oder globale Verantwortung überlagern.',
        questions: ['Stärkt es Rechtssicherheit?', 'Bleibt politische Eigenständigkeit gewahrt?', 'Ist der Nutzen für die Schweiz konkret?']
      }
    },
    FDP: {
      Wirtschaftsfreiheit: {
        focus: 'Unternehmertum, Wettbewerb und möglichst schlanke staatliche Eingriffe.',
        stance:
          'Die FDP stellt wirtschaftliche Freiheit ins Zentrum. Unternehmen sollen investieren, Arbeitsplätze schaffen und Innovation vorantreiben können, ohne durch übermässige Regulierung, hohe Abgaben oder lange Verfahren gebremst zu werden.',
        practice:
          'Bei Abstimmungen unterstützt die FDP Vorlagen, die Standortbedingungen verbessern, Handel erleichtern, Regulierung abbauen oder Eigentumsrechte stärken. Sie lehnt Eingriffe ab, wenn sie aus ihrer Sicht Investitionen, Preise oder Wettbewerbsfähigkeit schwächen.',
        counter:
          'Linke Parteien kritisieren, wirtschaftliche Freiheit könne soziale Ungleichheit, Lohndruck oder Umweltkosten ausblenden. Grüne warnen vor Marktlogik ohne ausreichend verbindliche Nachhaltigkeitsziele.',
        questions: ['Stärkt die Vorlage den Standort?', 'Bleibt Wettbewerb offen?', 'Wer trägt externe Kosten?']
      },
      'Bildung & Innovation': {
        focus: 'Fachkräfte, Forschung und Technologie als Basis des Wohlstands.',
        stance:
          'Die FDP sieht Bildung und Innovation als wichtigste Ressourcen der Schweiz. Sie setzt auf starke Berufsbildung, Hochschulen, Forschung, digitale Kompetenzen und Rahmenbedingungen, die Start-ups und Unternehmen wachsen lassen.',
        practice:
          'In Abstimmungen unterstützt die FDP Investitionen in Forschung, MINT, Digitalisierung und internationale Zusammenarbeit, wenn Effizienz und Leistung stimmen. Sie bevorzugt flexible Bildungswege und Partnerschaften zwischen Staat, Hochschulen und Wirtschaft.',
        counter:
          'Linke Parteien kritisieren, Innovationspolitik dürfe nicht nur Standortinteressen dienen, sondern müsse Chancengleichheit und öffentliche Verantwortung stärker betonen. Konservative Stimmen hinterfragen Kosten und Reformtempo.',
        questions: ['Entstehen echte Kompetenzen?', 'Profitiert der Standort?', 'Bleibt Zugang fair?']
      },
      Steuersenkung: {
        focus: 'Tiefere Belastung für Personen und Unternehmen bei kontrollierten Staatsausgaben.',
        stance:
          'Die FDP befürwortet tiefere Steuern, wenn dadurch Arbeit, Investitionen und Konsum gestärkt werden. Sie argumentiert, dass ein attraktives Steuersystem Wohlstand schafft und dem Staat langfristig stabile Einnahmen ermöglicht.',
        practice:
          'Bei Abstimmungen unterstützt die FDP Steuerentlastungen für Unternehmen, Mittelstand oder Kapitalbildung, wenn sie aus ihrer Sicht finanzierbar sind. Sie fordert gleichzeitig Ausgabendisziplin und lehnt neue Abgaben ohne klaren Mehrwert ab.',
        counter:
          'Linke Parteien kritisieren Steuersenkungen als Entlastung für Wohlhabende oder Unternehmen, während öffentliche Leistungen unter Druck geraten. Die Mitte fragt oft stärker nach Gegenfinanzierung und Verteilungseffekten.',
        questions: ['Wer wird entlastet?', 'Wie wird es gegenfinanziert?', 'Stärkt es Arbeit und Investitionen?']
      },
      Bürokratieabbau: {
        focus: 'Einfachere Verfahren, weniger Regulierung und schnellere Entscheidungen.',
        stance:
          'Die FDP sieht Bürokratie als Kostenfaktor für Unternehmen, Vereine und Bürgerinnen. Sie will Bewilligungen beschleunigen, Regeln vereinfachen und staatliche Prozesse digitalisieren.',
        practice:
          'In Abstimmungen unterstützt die FDP Vorlagen, die Berichtspflichten senken, Verfahren kürzen oder Verwaltung digitalisieren. Sie ist skeptisch bei neuen Kontrollen, Nachweisen oder Detailvorschriften, wenn deren Nutzen nicht klar belegt ist.',
        counter:
          'Linke und grüne Parteien warnen, Bürokratieabbau könne Schutzstandards für Arbeitnehmende, Konsumenten oder Umwelt schwächen. Sie sehen Regeln oft als notwendige Absicherung gegen Missbrauch.',
        questions: ['Welche Pflicht fällt weg?', 'Bleiben Schutzstandards erhalten?', 'Wird der Staat wirklich schneller?']
      },
      Bilaterale: {
        focus: 'Stabile Beziehungen zur EU, Marktzugang und Rechtssicherheit.',
        stance:
          'Die FDP unterstützt den bilateralen Weg, weil Schweizer Unternehmen, Forschung und Arbeitsmarkt stark mit Europa verbunden sind. Sie will Zugang zu Märkten und Programmen sichern, ohne der EU beizutreten.',
        practice:
          'Bei Abstimmungen beurteilt die FDP EU-Vorlagen nach Rechtssicherheit, wirtschaftlichem Nutzen und institutioneller Kontrolle. Personenfreizügigkeit, Forschungsabkommen oder Marktzugang werden positiv gewichtet, wenn flankierende Massnahmen und Souveränität ausreichend geregelt sind.',
        counter:
          'Die SVP kritisiert den bilateralen Weg als schleichende Übernahme fremder Regeln. Linke Parteien verlangen stärkere Lohnschutz- und Sozialstandards, bevor sie wirtschaftliche Öffnung unterstützen.',
        questions: ['Sichert es Marktzugang?', 'Bleibt Souveränität gewahrt?', 'Ist Lohnschutz geregelt?']
      },
      Sicherheit: {
        focus: 'Handlungsfähiger Staat, Armee, Polizei und Cyberabwehr.',
        stance:
          'Die FDP versteht Sicherheit als Voraussetzung für Freiheit. Sie unterstützt eine moderne Armee, gut ausgerüstete Sicherheitsbehörden, Cyberresilienz und internationale Kooperation, wenn Bedrohungen grenzüberschreitend sind.',
        practice:
          'In Abstimmungen unterstützt die FDP Investitionen in Verteidigung, Polizei, Nachrichtendienst oder Cybersecurity, wenn Kompetenzen klar begrenzt und rechtsstaatlich kontrolliert sind. Sie lehnt Sicherheitspolitik ab, wenn sie ineffizient oder symbolisch bleibt.',
        counter:
          'Linke und grüne Parteien warnen vor Aufrüstung, Überwachung oder Einschränkungen von Grundrechten. Die SVP kritisiert internationale Sicherheitskooperation, wenn sie Neutralität oder Eigenständigkeit gefährdet sieht.',
        questions: ['Erhöht es reale Sicherheit?', 'Sind Grundrechte geschützt?', 'Ist die Finanzierung effizient?']
      }
    },
    SVP: {
      Migrationspolitik: {
        focus: 'Begrenzung der Zuwanderung, nationale Steuerbarkeit und Druck auf Infrastruktur.',
        stance:
          'Die SVP macht Migration zu einem ihrer zentralen Themen. Sie argumentiert, hohe Zuwanderung belaste Wohnungsmarkt, Sozialwerke, Schulen, Verkehr und öffentliche Sicherheit. Die Schweiz soll stärker selbst bestimmen, wer einwandern darf und unter welchen Bedingungen.',
        practice:
          'Bei Abstimmungen unterstützt die SVP Kontingente, strengere Asylregeln, Ausschaffungen krimineller Ausländer und Massnahmen gegen aus ihrer Sicht ungesteuerte Personenfreizügigkeit. Wirtschaftliche Bedürfnisse werden anerkannt, aber der politische Vorrang liegt auf Kontrolle, Begrenzung und nationaler Zuständigkeit.',
        counter:
          'Andere Parteien kritisieren, die SVP vereinfache komplexe Probleme und gefährde Wirtschaft, Forschung und bilaterale Beziehungen. Sie betonen, viele Branchen seien auf Arbeitskräfte aus dem Ausland angewiesen.',
        questions: ['Wie wird Zuwanderung konkret begrenzt?', 'Welche Folgen hat es für Wirtschaft und EU?', 'Sind Grundrechte und Integration berücksichtigt?']
      },
      Neutralität: {
        focus: 'Eigenständigkeit, keine Bündnislogik und Zurückhaltung in internationalen Konflikten.',
        stance:
          'Für die SVP ist Neutralität ein Schutzschild der Schweiz. Sie lehnt Schritte ab, die die Schweiz politisch oder militärisch zu stark an EU, NATO oder andere Machtblöcke binden könnten. Sanktionen und Kooperationen beurteilt sie danach, ob sie die Glaubwürdigkeit der Neutralität schwächen.',
        practice:
          'In Abstimmungen und Debatten unterstützt die SVP eine strikte Auslegung der Neutralität, mehr Eigenständigkeit in der Aussenpolitik und Zurückhaltung bei internationalen Verpflichtungen. Sicherheit soll primär über eine starke eigene Armee und klare Interessenpolitik gewährleistet werden.',
        counter:
          'Kritiker sagen, eine zu starre Neutralität könne die Schweiz isolieren und ihre Verantwortung in Europa schwächen. Andere Parteien betonen, Neutralität bedeute nicht Gleichgültigkeit gegenüber Völkerrechtsverletzungen.',
        questions: ['Bleibt die Schweiz bündnisfrei?', 'Schützt es eigene Interessen?', 'Welche Verantwortung trägt die Schweiz international?']
      },
      Direktdemokratie: {
        focus: 'Volksrechte, Referenden und Vorrang demokratischer Entscheidungen.',
        stance:
          'Die SVP sieht direkte Demokratie als zentrales Korrektiv gegen politische Eliten, internationale Gerichte und Verwaltung. Volksentscheide sollen aus ihrer Sicht klar umgesetzt werden, auch wenn sie für Regierung oder internationale Partner unbequem sind.',
        practice:
          'Bei Abstimmungen unterstützt die SVP Initiativen und Referenden, die Kompetenzen zurück zum Volk bringen oder internationale Bindungen begrenzen. Sie kritisiert Umsetzungen, die aus ihrer Sicht den Volkswillen verwässern.',
        counter:
          'Andere Parteien warnen, direkte Demokratie müsse mit Rechtsstaat, Minderheitenschutz und internationalen Verpflichtungen vereinbar bleiben. Sie kritisieren, die SVP stelle Volkswillen manchmal gegen Grundrechte oder Verträge.',
        questions: ['Stärkt es Volksrechte?', 'Bleibt Rechtsstaat gewahrt?', 'Ist die Umsetzung international tragfähig?']
      },
      Eigenverantwortung: {
        focus: 'Weniger Staat, persönliche Verantwortung und tiefe Abgaben.',
        stance:
          'Die SVP betont Eigenverantwortung in Sozial-, Gesundheits-, Steuer- und Wirtschaftspolitik. Der Staat soll Rahmenbedingungen setzen, aber Bürgerinnen, Familien und Unternehmen nicht durch immer neue Ansprüche und Pflichten bevormunden.',
        practice:
          'In Abstimmungen lehnt die SVP oft neue Sozialleistungen, Abgaben oder Regulierungen ab, wenn sie Kosten erhöhen oder Abhängigkeit vom Staat fördern. Sie unterstützt Entlastungen, Sparmassnahmen und Lösungen, die Verantwortung stärker bei Einzelnen oder Gemeinden belassen.',
        counter:
          'Linke Parteien kritisieren, Eigenverantwortung könne soziale Risiken individualisieren und Menschen mit wenig Ressourcen überfordern. Die Mitte fragt oft, ob Einsparungen regionale oder familiäre Belastungen verschieben.',
        questions: ['Welche Verantwortung bleibt privat?', 'Wer wird durch Kürzungen belastet?', 'Sinken Kosten tatsächlich?']
      },
      Landwirtschaft: {
        focus: 'Bauernfamilien, Versorgungssicherheit und Schutz ländlicher Räume.',
        stance:
          'Die SVP ist stark mit ländlichen Interessen verbunden. Sie betont Ernährungssicherheit, Schutz des Kulturlands, tiefe Auflagen für Bauernbetriebe und faire Preise für Schweizer Produkte. Importdruck und ökologische Detailregulierung sieht sie kritisch.',
        practice:
          'Bei Abstimmungen unterstützt die SVP Agrarpolitik, wenn sie einheimische Produktion stärkt und Bauernfamilien nicht zusätzlich belastet. Sie lehnt Vorlagen ab, die aus ihrer Sicht Produktionskosten erhöhen, Tierhaltung erschweren oder die Schweiz stärker von Importen abhängig machen.',
        counter:
          'Grüne und linke Parteien kritisieren, die SVP verteidige bestehende Produktionsmodelle zu stark und vernachlässige Biodiversität, Klima und Tierwohl. Liberale Stimmen kritisieren Subventionen und Marktabschottung.',
        questions: ['Stärkt es Schweizer Produktion?', 'Sind Auflagen für Betriebe tragbar?', 'Wie wirken Umwelt und Tierwohl?']
      },
      'EU-Skepsis': {
        focus: 'Keine schleichende Integration, Schutz der Souveränität und Kontrolle über Recht.',
        stance:
          'Die SVP lehnt eine institutionelle Annäherung an die EU ab, wenn damit automatische Rechtsübernahme, fremde Richter oder Einschränkungen der direkten Demokratie verbunden sind. Für sie soll die Schweiz wirtschaftlich kooperieren, aber politisch eigenständig bleiben.',
        practice:
          'In Abstimmungen bekämpft die SVP Rahmenabkommen, Personenfreizügigkeit oder EU-Regeln, wenn sie aus ihrer Sicht Schweizer Recht und Volksrechte schwächen. Bilaterale Verträge akzeptiert sie nur, wenn sie klar begrenzt und kündbar bleiben.',
        counter:
          'FDP, Mitte, GLP und linke Parteien warnen, zu starke EU-Skepsis gefährde Marktzugang, Forschung, Stromversorgung und Rechtssicherheit. Sie argumentieren, Souveränität bestehe auch darin, stabile Beziehungen aktiv zu gestalten.',
        questions: ['Übernimmt die Schweiz fremdes Recht?', 'Welche Folgen hat ein Nein für Wirtschaft und Forschung?', 'Bleiben Verträge demokratisch kontrollierbar?']
      }
    }
  };

  function topicTitle(topic: string): string {
    return topic;
  }

  function topicKind(topic: string): string {
    const lower = topic.toLowerCase();
    if (lower.includes('klima') || lower.includes('energie') || lower.includes('biodivers') || lower.includes('umwelt') || lower.includes('ökolog') || lower.includes('co₂')) return 'climate';
    if (lower.includes('migration') || lower.includes('eu') || lower.includes('bilateral') || lower.includes('aussen') || lower.includes('neutral')) return 'foreign';
    if (lower.includes('wirtschaft') || lower.includes('steuer') || lower.includes('kmu') || lower.includes('bürokratie') || lower.includes('markt')) return 'economy';
    if (lower.includes('gesund') || lower.includes('ahv') || lower.includes('sozial') || lower.includes('familie') || lower.includes('gleichstellung') || lower.includes('mindestlohn') || lower.includes('wohnbau')) return 'social';
    if (lower.includes('bildung') || lower.includes('digital') || lower.includes('innovation')) return 'future';
    if (lower.includes('sicherheit') || lower.includes('armee')) return 'security';
    if (lower.includes('direkt') || lower.includes('föderal')) return 'democracy';
    if (lower.includes('landwirtschaft') || lower.includes('raumplanung') || lower.includes('verkehr')) return 'territory';
    return 'default';
  }

  const topicIconMap: Record<string, string> = {
    'Soziale Gerechtigkeit': '<path d="M12 4v16"/><path d="M5 8h14"/><path d="M7 8l-3 6h6L7 8Z"/><path d="M17 8l-3 6h6l-3-6Z"/>',
    Klimaschutz: '<path d="M5 13c4-7 10-8 14-8-1 7-5 12-12 12"/><path d="M8 16c2-4 5-7 10-10"/>',
    Gleichstellung: '<circle cx="12" cy="12" r="8"/><path d="M8 10h8"/><path d="M8 14h8"/>',
    'AHV-Ausbau': '<path d="M6 20V9a6 6 0 0 1 12 0v11"/><path d="M4 20h16"/><path d="M9 13h6"/><path d="M9 16h6"/>',
    Mindestlohn: '<circle cx="8" cy="14" r="4"/><path d="M14 15V7"/><path d="M10 11l4-4 4 4"/>',
    Wohnbau: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
    Klimakrise: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8"/><path d="M8 17a4 4 0 1 0 8 0c0-1.3-.6-2.4-2-3.2"/><path d="M18 5l1-1"/><path d="M20 9h2"/><path d="M18 13l1 1"/>',
    Biodiversität: '<path d="M12 20v-7"/><path d="M8 13c-3 0-5-2-5-5 3 0 5 2 5 5Z"/><path d="M16 13c3 0 5-2 5-5-3 0-5 2-5 5Z"/><circle cx="12" cy="8" r="2"/>',
    'Erneuerbare Energien': '<circle cx="8" cy="8" r="3"/><path d="M8 1v2"/><path d="M8 13v2"/><path d="M1 8h2"/><path d="M13 8h2"/><path d="M15 13h5l-4 8h5"/>',
    Verkehrswende: '<path d="M5 17h14"/><path d="M7 17V7h10v10"/><path d="M9 7V5h6v2"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/>',
    'Soziale Ökologie': '<path d="M7 17c3-6 7-8 12-8-1 6-4 9-10 9"/><path d="M5 20c2-4 5-7 10-10"/><circle cx="6" cy="8" r="3"/><path d="M3 14c1.2-2 4.8-2 6 0"/>',
    Tierschutz: '<circle cx="12" cy="14" r="3"/><circle cx="7" cy="10" r="1.6"/><circle cx="10" cy="7" r="1.6"/><circle cx="14" cy="7" r="1.6"/><circle cx="17" cy="10" r="1.6"/>',
    'Ökologische Marktwirtschaft': '<path d="M4 18h16"/><path d="M7 15l4-4 3 3 5-7"/><path d="M6 8c3-4 7-4 10-4-1 4-4 7-9 7"/>',
    'CO₂-Lenkungsabgabe': '<path d="M4 12a8 8 0 0 1 13-6"/><path d="M17 6h-4V2"/><path d="M20 12a8 8 0 0 1-13 6"/><path d="M7 18h4v4"/><circle cx="12" cy="12" r="2.5"/>',
    Digitalisierung: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9z"/><path d="M12 1v3"/><path d="M12 20v3"/><path d="M1 12h3"/><path d="M20 12h3"/>',
    Bildung: '<path d="M4 6.5c2-1 5-1 8 1v11c-3-2-6-2-8-1v-11Z"/><path d="M12 7.5c3-2 6-2 8-1v11c-2-1-5-1-8 1v-11Z"/>',
    Raumplanung: '<path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z"/><path d="M9 4v14"/><path d="M15 6v14"/>',
    Verkehr: '<path d="M5 18c5-8 9-8 14 0"/><path d="M5 18h14"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><path d="M12 10v4"/>',
    Familienpolitik: '<path d="M4 12l8-7 8 7"/><path d="M6 11v9h12v-9"/><circle cx="10" cy="14" r="1.7"/><circle cx="14" cy="14" r="1.7"/><path d="M9 18c1.5-2 4.5-2 6 0"/>',
    Landwirtschaft: '<path d="M4 19c4-6 12-6 16 0"/><path d="M12 19V7"/><path d="M8 11c-2 0-4-2-4-4 3 0 5 1.5 6 4"/><path d="M16 11c2 0 4-2 4-4-3 0-5 1.5-6 4"/>',
    Gesundheit: '<path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4Z"/>',
    Föderalismus: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M8 7.5l3 8"/><path d="M16 7.5l-3 8"/><path d="M8 6h8"/>',
    'KMU-Förderung': '<path d="M4 10h16l-1-5H5l-1 5Z"/><path d="M6 10v10h12V10"/><path d="M9 20v-5h6v5"/><path d="M4 10c0 2 3 2 4 0 1 2 5 2 6 0 1 2 4 2 6 0"/>',
    Aussenpolitik: '<circle cx="11" cy="11" r="7"/><path d="M4 11h14"/><path d="M11 4c2 2 3 4.4 3 7s-1 5-3 7"/><path d="M11 4c-2 2-3 4.4-3 7s1 5 3 7"/><path d="M18 14l3 2-3 2v-4Z"/>',
    Wirtschaftsfreiheit: '<path d="M4 18h16"/><path d="M6 15l4-4 3 3 5-7"/><path d="M18 7v5h-5"/>',
    'Bildung & Innovation': '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-.8.6-1 1.5-1 2H9c0-.5-.2-1.4-1-2Z"/><path d="M12 8v4l2 2"/>',
    Steuersenkung: '<circle cx="7" cy="8" r="3"/><path d="M15 5v12"/><path d="M11 13l4 4 4-4"/><path d="M5 18h15"/>',
    Bürokratieabbau: '<path d="M7 4h10v16H7z"/><path d="M9 8h6"/><path d="M9 12h5"/><path d="M9 16h3"/><path d="M4 20L20 4"/>',
    Bilaterale: '<path d="M8 12l-2 2a3 3 0 0 0 4 4l2-2"/><path d="M16 12l2-2a3 3 0 0 0-4-4l-2 2"/><path d="M9 15l6-6"/>',
    Sicherheit: '<path d="M12 3l7 3v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z"/><path d="M9.5 12l1.8 1.8 3.4-4"/>',
    Migrationspolitik: '<path d="M4 12h13"/><path d="M13 8l4 4-4 4"/><path d="M20 5v14"/><path d="M6 7v10"/>',
    Neutralität: '<path d="M12 3l7 4v5c0 4-2.5 7-7 9-4.5-2-7-5-7-9V7l7-4Z"/><path d="M10 8h4v3h3v4h-3v3h-4v-3H7v-4h3V8Z"/>',
    Direktdemokratie: '<path d="M5 11h14v9H5z"/><path d="M8 11l4-7 4 7"/><path d="M9 15h6"/>',
    Eigenverantwortung: '<circle cx="12" cy="8" r="3"/><path d="M6 20c1-4 11-4 12 0"/><path d="M15 12l2 2 4-5"/>',
    'EU-Skepsis': '<circle cx="12" cy="12" r="8"/><path d="M7 17L17 7"/><path d="M8 9l1-.8"/><path d="M12 7l.3-1"/><path d="M16 9l1-.8"/><path d="M9 15l-1 .8"/><path d="M15 15l1 .8"/>'
  };

  function iconForTopic(topic: string): string {
    const topicIcon = topicIconMap[topic];
    if (topicIcon) return topicIcon;

    const kind = topicKind(topic);
    if (kind === 'climate') return '<path d="M12 21C8 17 5 13.7 5 9a7 7 0 0 1 14 0c0 4.7-3 8-7 12Z"/><path d="M9 10c2.5.2 4.5-1 6-3"/>';
    if (kind === 'foreign') return '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8M12 4c-2 2.2-3 4.9-3 8s1 5.8 3 8"/>';
    if (kind === 'economy') return '<path d="M4 19h16"/><path d="M7 16V9m5 7V5m5 11v-4"/><path d="M5 10l7-6 7 6"/>';
    if (kind === 'social') return '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>';
    if (kind === 'future') return '<path d="M12 3v4m0 10v4M3 12h4m10 0h4"/><circle cx="12" cy="12" r="4"/>';
    if (kind === 'security') return '<path d="M12 3l7 3v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z"/><path d="M9.5 12l1.8 1.8 3.4-4"/>';
    if (kind === 'democracy') return '<path d="M4 10h16"/><path d="M6 10V7l6-3 6 3v3M7 10v8m5-8v8m5-8v8"/><path d="M5 18h14"/>';
    if (kind === 'territory') return '<path d="M4 18c3-6 5-9 8-9s5 3 8 9"/><path d="M4 18h16"/><path d="M8 14l2 2 3-5 3 7"/>';
    return '<path d="M5 5h14v14H5z"/><path d="M9 9h6v6H9z"/>';
  }

  function stanceForTopic(topic: string): string {
    const lower = topic.toLowerCase();
    if (lower.includes('klima') || lower.includes('energie') || lower.includes('biodiversit') || lower.includes('umwelt')) {
      return `${p.name} verbindet dieses Thema mit ihrer Grundausrichtung: ${p.ausrichtung}. Konkret geht es um die Frage, wie stark der Staat lenken soll, welche Rolle Marktanreize spielen und wie Kosten zwischen Haushalten, Unternehmen und öffentlicher Hand verteilt werden.`;
    }
    if (lower.includes('migration') || lower.includes('eu') || lower.includes('bilateral') || lower.includes('aussen')) {
      return `${p.name} bewertet dieses Thema vor allem entlang von Souveränität, wirtschaftlicher Offenheit und Planbarkeit. Entscheidend ist, ob internationale Kooperation als Chance oder als Risiko für die Schweiz verstanden wird.`;
    }
    if (lower.includes('wirtschaft') || lower.includes('steuer') || lower.includes('kmu') || lower.includes('bürokratie')) {
      return `${p.name} setzt hier Schwerpunkte bei Standortpolitik, Finanzierung und Verantwortung zwischen Staat und Privaten. Die Partei argumentiert typischerweise mit langfristiger Tragbarkeit und Auswirkungen auf Arbeit, Unternehmen und Kaufkraft.`;
    }
    if (lower.includes('gesund') || lower.includes('ahv') || lower.includes('sozial') || lower.includes('familie') || lower.includes('gleichstellung') || lower.includes('mindestlohn') || lower.includes('wohnbau')) {
      return `${p.name} betrachtet dieses Thema durch die Brille sozialer Sicherheit und Alltagstauglichkeit. Zentral ist, wer entlastet wird, wer die Kosten trägt und ob eine Vorlage den gesellschaftlichen Zusammenhalt stärkt.`;
    }
    return `${p.name} ordnet dieses Thema in ihr Gesamtprofil ein: ${p.kurzprofil} Für konkrete Abstimmungen prüft die Partei jeweils Zweck, Kosten, Nebenwirkungen und Vereinbarkeit mit ihren Grundwerten.`;
  }

  function counterForTopic(topic: string): string {
    const left = p.spektrumLR < 40;
    const right = p.spektrumLR > 60;
    if (left) return `Bürgerliche Parteien kritisieren hier oft höhere Staatsausgaben, mehr Regulierung oder unklare Finanzierung.`;
    if (right) return `Linke und grüne Parteien kritisieren hier oft soziale Härten, fehlende ökologische Wirkung oder zu starke Marktlogik.`;
    return `Parteien links und rechts der Mitte kritisieren meist, dass die Position entweder zu kompromissorientiert oder zu wenig konsequent sei.`;
  }
  function focusForTopic(topic: string): string {
    const kind = topicKind(topic);
    if (kind === 'climate') return 'Klima, Ressourcen und Verantwortung zwischen Staat, Markt und Bevölkerung.';
    if (kind === 'foreign') return 'Souveränität, internationale Zusammenarbeit und verlässliche Beziehungen.';
    if (kind === 'economy') return 'Standortpolitik, Steuern, Regulierung und wirtschaftliche Handlungsfreiheit.';
    if (kind === 'social') return 'Alltag, Kaufkraft, soziale Sicherheit und Zugang zu öffentlichen Leistungen.';
    if (kind === 'future') return 'Bildung, Digitalisierung, Innovation und Vorbereitung auf strukturellen Wandel.';
    if (kind === 'security') return 'Sicherheit, Dienstpflicht, Institutionenvertrauen und staatliche Handlungsfähigkeit.';
    if (kind === 'democracy') return 'Direkte Demokratie, Föderalismus, Mitsprache und staatliche Balance.';
    if (kind === 'territory') return 'Raum, Verkehr, Landwirtschaft und Ausgleich zwischen Regionen.';
    return 'Grundwerte, politische Prioritäten und konkrete Folgen für Abstimmungen.';
  }

  function practiceForTopic(topic: string): string {
    const kind = topicKind(topic);
    if (kind === 'climate') return `In konkreten Vorlagen achtet ${p.name} darauf, ob Klimaschutz nur symbolisch bleibt oder tatsächlich messbare Wirkung entfaltet. Gleichzeitig prüft die Partei, ob Kosten tragbar bleiben, ob Haushalte und Unternehmen Planungssicherheit haben und ob die Umsetzung föderal realistisch ist.`;
    if (kind === 'foreign') return `In Abstimmungen wird dieses Thema meist dort entscheidend, wo Verträge, Personenfreizügigkeit, Neutralität oder internationale Verpflichtungen betroffen sind. ${p.name} wägt dann ab, ob die Schweiz durch Kooperation an Stabilität gewinnt oder ob demokratische Kontrolle und Eigenständigkeit zu stark eingeschränkt werden.`;
    if (kind === 'economy') return `${p.name} betrachtet wirtschaftliche Vorlagen nicht nur über Steuersätze, sondern über Wirkung auf Arbeitsplätze, Investitionen, Innovation und administrative Belastung. Politisch relevant wird das besonders, wenn eine Vorlage neue Abgaben, Verbote, Förderprogramme oder Pflichten für Unternehmen vorsieht.`;
    if (kind === 'social') return `Bei sozialen Fragen steht im Zentrum, wie stark eine Vorlage Haushalte entlastet, Risiken absichert und Teilhabe ermöglicht. ${p.name} prüft dabei auch, wer bezahlt, ob Leistungen gezielt wirken und ob neue Ansprüche langfristig finanzierbar bleiben.`;
    if (kind === 'future') return `Bei Zukunftsthemen geht es für ${p.name} um die Frage, ob die Schweiz genügend in Kompetenzen, Infrastruktur und Innovation investiert. Wichtig ist, dass neue Technologien nicht nur effizient sind, sondern auch zugänglich, sicher und demokratisch kontrollierbar bleiben.`;
    if (kind === 'security') return `${p.name} bewertet Sicherheitsfragen danach, ob Institutionen handlungsfähig bleiben und ob Grundrechte gewahrt werden. Besonders sensibel sind Vorlagen, die Pflicht, Freiheit und gesellschaftlichen Zusammenhalt gegeneinander abwägen.`;
    if (kind === 'democracy') return `In der direkten Demokratie achtet ${p.name} darauf, ob Entscheidungen nahe bei Bürgerinnen, Bürgern und Kantonen bleiben. Gleichzeitig stellt sich bei jeder Reform die Frage, ob föderale Vielfalt Probleme löst oder notwendige nationale Standards verhindert.`;
    if (kind === 'territory') return `${p.name} verbindet dieses Thema mit konkreten Lebensräumen: Agglomerationen, Berggebieten, Landwirtschaft, Mobilität und Infrastruktur. Entscheidend ist, ob eine Vorlage regionale Unterschiede respektiert und trotzdem gesamtschweizerisch tragfähig bleibt.`;
    return `In konkreten Abstimmungen prüft ${p.name}, ob eine Vorlage mit dem eigenen Profil vereinbar ist, welche Gruppen profitieren, welche Nebenwirkungen entstehen und ob Umsetzung, Finanzierung und demokratische Legitimation überzeugen.`;
  }

  function questionsForTopic(topic: string): string[] {
    const kind = topicKind(topic);
    if (kind === 'climate') return ['Wirkt die Massnahme tatsächlich messbar?', 'Wer trägt die Kosten?', 'Ist die Umsetzung für Kantone und Wirtschaft realistisch?'];
    if (kind === 'foreign') return ['Stärkt oder schwächt die Vorlage die Souveränität?', 'Welche Folgen hat sie für internationale Beziehungen?', 'Bleibt demokratische Kontrolle gesichert?'];
    if (kind === 'economy') return ['Wie wirkt die Vorlage auf KMU und Arbeitsplätze?', 'Entsteht mehr Bürokratie?', 'Ist die Finanzierung langfristig tragbar?'];
    if (kind === 'social') return ['Wer wird konkret entlastet?', 'Ist die Lösung gezielt genug?', 'Wie wird sie nachhaltig finanziert?'];
    if (kind === 'future') return ['Fördert die Vorlage echte Innovation?', 'Bleibt Zugang fair verteilt?', 'Sind Datenschutz und Sicherheit geklärt?'];
    if (kind === 'security') return ['Erhöht die Vorlage reale Sicherheit?', 'Bleiben Freiheitsrechte gewahrt?', 'Sind Pflichten fair verteilt?'];
    if (kind === 'democracy') return ['Bleibt Mitsprache erhalten?', 'Sind Kantone angemessen eingebunden?', 'Ist die Lösung verständlich und umsetzbar?'];
    if (kind === 'territory') return ['Welche Regionen profitieren?', 'Welche Infrastruktur wird belastet?', 'Ist der Ausgleich Stadt-Land überzeugend?'];
    return ['Welches Problem wird gelöst?', 'Welche Nebenwirkungen entstehen?', 'Passt die Vorlage zu den Grundwerten der Partei?'];
  }

  function detailForTopic(topic: string): TopicDetail {
    const customCopy = topicDetailsByParty[p.kuerzel]?.[topic];
    if (customCopy) {
      return {
        iconPath: iconForTopic(topic),
        ...customCopy
      };
    }

    const left = p.spektrumLR < 40;
    const right = p.spektrumLR > 60;
    const counterExtension = left
      ? 'Typisch ist der Vorwurf, dass gute Absichten zu komplexen Programmen führen, die Kosten erhöhen und Eigenverantwortung schwächen.'
      : right
        ? 'Typisch ist der Vorwurf, dass Effizienz und Freiheit betont werden, während Verteilungsfragen oder langfristige Umweltkosten zu kurz kommen.'
        : 'Von links kommt oft der Vorwurf mangelnder sozialer oder ökologischer Schärfe; von rechts der Vorwurf, dass Kompromisse neue Regeln schaffen, ohne Probleme klar zu lösen.';

    return {
      iconPath: iconForTopic(topic),
      focus: focusForTopic(topic),
      stance: stanceForTopic(topic),
      counter: `${counterForTopic(topic)} ${counterExtension}`,
      practice: practiceForTopic(topic),
      questions: questionsForTopic(topic)
    };
  }

  function profileDeepDive(): string {
    const topTopics = p.kernthemen.slice(0, 3).join(', ');
    if (p.spektrumLR < 40) {
      return `${p.name} argumentiert häufig aus der Perspektive von sozialem Ausgleich, öffentlicher Verantwortung und Schutz vor einseitigen Machtverhältnissen. Bei Vorlagen zu ${topTopics} fragt die Partei deshalb besonders stark, ob Menschen mit tieferen und mittleren Einkommen profitieren, ob Leistungen zugänglich bleiben und ob ökologische oder gesellschaftliche Kosten fair verteilt werden.`;
    }
    if (p.spektrumLR > 60) {
      return `${p.name} argumentiert häufig aus der Perspektive von Eigenverantwortung, nationaler Steuerbarkeit und möglichst schlanken staatlichen Eingriffen. Bei Vorlagen zu ${topTopics} prüft die Partei deshalb besonders stark, ob neue Regeln Freiheit und Souveränität einschränken, ob Kosten ausufern und ob die Schweiz ihre Entscheidungen selbst kontrollieren kann.`;
    }
    return `${p.name} argumentiert häufig aus der Perspektive von Ausgleich, Umsetzbarkeit und föderaler Tragfähigkeit. Bei Vorlagen zu ${topTopics} prüft die Partei deshalb besonders stark, ob ein politischer Kompromiss praxistauglich ist, ob Kosten und Nutzen ausgewogen verteilt sind und ob Kantone, Gemeinden, Wirtschaft und Haushalte mit der Lösung arbeiten können.`;
  }

  function profileVotingLogic(): string {
    const orientation = p.spektrumLR < 40 ? 'soziale und ökologische Wirkung' : p.spektrumLR > 60 ? 'Freiheit, Sicherheit und nationale Kontrolle' : 'Ausgleich, Stabilität und konkrete Umsetzbarkeit';
    return `Für Nutzerinnen und Nutzer ist wichtig: Eine Parteiposition ist selten nur ein Ja oder Nein aus Gewohnheit. Sie entsteht aus wiederkehrenden Prioritäten. Bei ${p.kuerzel}-Positionen lohnt sich deshalb der Blick auf ${orientation}, auf die Finanzierung und auf mögliche Nebenwirkungen. Genau diese Logik macht die Kernthemen unten nachvollziehbar.`;
  }
</script>

<svelte:head>
  <title>{p.name} ({p.kuerzel}) – Voting Assistant</title>
  <meta name="description" content="{p.kurzprofil.slice(0, 155)}" />
</svelte:head>

<AppBar title={p.kuerzel} backHref="/parteien" />

<!-- HERO with party color -->
<section
  class="party-hero border-b border-border-light"
  style="--party-color: {p.farbe}; --party-soft: {p.farbeLight};"
>
  <div class="container-app py-10 md:py-14">
    <a href="/parteien" class="party-hero-link hidden md:inline-flex items-center gap-1.5 text-sm font-semibold mb-6">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Alle Parteien
    </a>

    <div class="flex items-start gap-5">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-card"
        style="background-color: {p.farbe};"
        aria-hidden="true"
      >
        {p.kuerzel.slice(0, 4)}
      </div>
      <div class="flex-1 min-w-0">
        <p class="party-hero-meta font-mono-data text-xs uppercase tracking-wider mb-1">
          {p.ausrichtung} · seit {p.gegruendet}
        </p>
        <h1 class="font-display text-3xl md:text-5xl text-ink leading-tight mb-2">
          {p.name}
        </h1>
        <p class="text-base md:text-lg text-ink-muted">Profil, Kernthemen und ausgewählte Abstimmungspositionen im Kontext.</p>
      </div>
    </div>
  </div>
</section>

<!-- DETAILS GRID -->
<section class="container-app py-10 md:py-14">
  <div class="grid md:grid-cols-3 gap-6 md:gap-8">
    <!-- Kurzprofil + Fakten -->
    <div class="md:col-span-2">
      <p class="section-eyebrow mb-2">Über die {p.kuerzel}</p>
      <h2 class="font-display text-2xl text-ink mb-4 border-b border-border-light pb-2">Profil</h2>
      <div class="profile-copy mb-8">
        <p>{p.kurzprofil}</p>
        <p>{profileDeepDive()}</p>
        <p>{profileVotingLogic()}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="card p-5" style="border-top: 4px solid {p.farbe};">
          <p class="section-eyebrow mb-2">Politische Rolle</p>
          <p class="text-sm text-ink-muted leading-relaxed">
            Mit einer Position von <strong class="party-inline-accent">{p.spektrumLR}/100</strong> auf der Links-Rechts-Achse
            steht die Partei im Bereich <strong>{p.ausrichtung}</strong>. In Abstimmungen ist sie besonders relevant,
            wenn Vorlagen Wertefragen mit Kosten-, Freiheits- oder Standortfragen verbinden.
          </p>
        </div>
        <div class="card p-5" style="border-top: 4px solid {p.farbe};">
          <p class="section-eyebrow mb-2">Einordnung im Kompass</p>
          <p class="text-sm text-ink-muted leading-relaxed">
            Für die Einordnung sind unter anderem {p.kernthemen.slice(0, 3).join(', ')} relevant.
            Der Kompass vergleicht deine Antworten mit programmatischen Schwerpunkten und ausgewählten
            Parolen zu Abstimmungen, ohne daraus eine Wahlempfehlung abzuleiten.
          </p>
        </div>
      </div>

    </div>

    <!-- Fakten Sidebar -->
    <aside class="md:col-span-1">
      <div class="card p-5 mb-4">
        <p class="section-eyebrow mb-4">Fakten</p>
        <dl class="space-y-3 text-sm">
          <div class="flex justify-between border-b border-border-light pb-2">
            <dt class="text-ink-muted">Gegründet</dt>
            <dd class="font-mono-data text-ink font-semibold">{p.gegruendet}</dd>
          </div>
          <div class="flex justify-between border-b border-border-light pb-2">
            <dt class="text-ink-muted">Mitglieder</dt>
            <dd class="font-mono-data text-ink font-semibold">{mitgliederFmt}</dd>
          </div>
          <div class="border-b border-border-light pb-2">
            <dt class="text-ink-muted mb-0.5">Präsidium</dt>
            <dd class="text-ink font-medium leading-snug">{p.praesident}</dd>
          </div>
          <div>
            <dt class="text-ink-muted mb-0.5">Website</dt>
            <dd>
              <a href="https://{p.website}" target="_blank" rel="noopener" class="source-link inline-flex items-center gap-1">
                {p.website}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Spektrum -->
      <div class="card p-5">
        <p class="section-eyebrow mb-4">Politisches Spektrum</p>

        <p class="text-xs font-semibold text-ink mb-1.5">Links → Rechts</p>
        <div class="flex justify-between text-[10px] font-mono-data text-ink-muted uppercase tracking-wider mb-1.5">
          <span>Links</span>
          <span>Rechts</span>
        </div>
        <div class="spektrum-bar mb-4">
          <div class="spektrum-dot" style="left: {p.spektrumLR}%;" />
        </div>

        <p class="text-xs font-semibold text-ink mb-1.5">Wirtschaft → Umwelt</p>
        <div class="flex justify-between text-[10px] font-mono-data text-ink-muted uppercase tracking-wider mb-1.5">
          <span>Wirtschaft</span>
          <span>Umwelt</span>
        </div>
        <div
          class="relative h-2 rounded-full mb-1"
          style="background: linear-gradient(to right, #2563EB 0%, #EAB308 50%, #16A34A 100%);"
        >
          <div class="spektrum-dot" style="left: {p.spektrumUW}%;" />
        </div>
      </div>
    </aside>
  </div>
</section>

<!-- KERNTHEMEN -->
<section class="container-app pb-12">
  <div
    class="theme-explorer"
    style="--party-color: {p.farbe}; --party-soft: {p.farbeLight};"
  >
    <div class="theme-explorer-head">
      <div>
        <p class="section-eyebrow mb-1">Kernthemen im Detail</p>
        <h3 class="font-display text-2xl md:text-3xl text-ink">Wofür die {p.kuerzel} politisch steht</h3>
        <p class="theme-explorer-lead">
          Wähle ein Thema aus: links als kompakte Themenliste, rechts mit Haltung, Abstimmungslogik,
          typischem Gegenargument und den wichtigsten Prüffragen.
        </p>
      </div>
      <span class="theme-explorer-count">{p.kernthemen.length} Themen</span>
    </div>

    <div class="theme-explorer-grid">
      <nav class="theme-topic-nav" aria-label="Kernthema auswählen">
        {#each p.kernthemen as thema}
          <button
            type="button"
            class="theme-topic-button"
            class:active={selectedTopic === thema}
            on:click={() => (selectedTopic = thema)}
            aria-pressed={selectedTopic === thema}
            aria-label={selectedTopic === thema ? `${topicTitle(thema)} ist aktiv` : `${topicTitle(thema)} öffnen`}
          >
            <span class="theme-topic-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {@html iconForTopic(thema)}
              </svg>
            </span>
            <span class="theme-topic-text">
              <span class="theme-title">{topicTitle(thema)}</span>
              {#if selectedTopic === thema}
                <span class="theme-cta">Aktiv</span>
              {/if}
            </span>
          </button>
        {/each}
      </nav>

      <div class="theme-detail-wrap">
        {#key selectedTopic}
          <article class="theme-detail-card">
            <div class="theme-detail-top">
              <span class="theme-icon large" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {@html selectedTopicDetail.iconPath}
                </svg>
              </span>
              <div>
                <h4>{selectedTopic}</h4>
              </div>
            </div>

            <p class="theme-focus">{selectedTopicDetail.focus}</p>

            <div class="theme-detail-section">
              <p class="theme-detail-label">Haltung der Partei</p>
              <p>{selectedTopicDetail.stance}</p>
            </div>

            <div class="theme-detail-section">
              <p class="theme-detail-label">In Abstimmungen bedeutet das</p>
              <p>{selectedTopicDetail.practice}</p>
            </div>

            <div class="theme-detail-section counter">
              <p class="theme-detail-label">Typisches Gegenargument</p>
              <p>{selectedTopicDetail.counter}</p>
            </div>

            <div class="theme-question-list">
              {#each selectedTopicDetail.questions as question}
                <span>{question}</span>
              {/each}
            </div>
          </article>
        {/key}
      </div>
    </div>
  </div>
</section>

<!-- POSITIONEN ZU ABSTIMMUNGEN -->
{#if data.positionen.length > 0}
  <section class="container-app pb-12">
    <div class="border-b border-border-light pb-2 mb-5">
      <p class="section-eyebrow mb-1">Ausgewählte Vorlagen</p>
      <h2 class="font-display text-2xl text-ink">Ausgewählte Positionen zu Abstimmungen</h2>
      <p class="text-sm text-ink-muted mt-2 max-w-2xl">
        Die Einträge zeigen kuratierte Parteiempfehlungen und Positionen aus dem Prototyp-Datensatz. Sie dienen als Kontext und suggerieren keine laufende Aktualität.
      </p>
    </div>

    <div class="space-y-3">
      {#each data.positionen as item}
        <a
          href="/abstimmungen/{item.abstimmung.slug}"
          class="card card-interactive p-5 flex items-start gap-4"
          style="border-left: 4px solid {p.farbe};"
        >
          <div class="flex-1 min-w-0">
            <p class="font-mono-data text-[10px] text-ink-subtle uppercase tracking-wider mb-1">
              {formatDate(item.abstimmung.date)} · {item.abstimmung.category}
            </p>
            <h3 class="font-display text-lg text-ink mb-1 leading-snug">
              {item.abstimmung.shortTitle}
            </h3>
            <p class="text-sm text-ink-muted italic">«{item.statement}»</p>
          </div>
          <Badge position={item.position} size="md" />
        </a>
      {/each}
    </div>
  </section>
{/if}

<!-- Lokale Reflexion zur Partei -->
<section class="container-app pb-20">
  <ParteiReflection parteiKuerzel={p.kuerzel} parteiName={p.name} parteiFarbe={p.farbe} />
</section>

<style>
  .party-hero {
    background:
      radial-gradient(circle at left 55%, color-mix(in srgb, var(--party-soft) 72%, transparent), transparent 34%),
      linear-gradient(135deg, color-mix(in srgb, var(--party-soft) 82%, var(--surface)) 0%, var(--surface) 72%);
  }

  .party-hero-link,
  .party-hero-meta,
  .party-inline-accent {
    color: var(--party-color);
  }

  .party-hero-link {
    transition: color 160ms ease;
  }

  .party-hero-link:hover {
    color: color-mix(in srgb, var(--party-color) 78%, var(--text));
  }

  .party-inline-accent {
    font-weight: 800;
  }

  .profile-copy {
    color: var(--text-muted);
    display: grid;
    font-size: 1.02rem;
    gap: 0.9rem;
    line-height: 1.72;
    max-width: 74ch;
  }

  .profile-copy p {
    margin: 0;
  }

  .profile-copy p:first-child {
    color: var(--text);
    font-size: 1.08rem;
  }

  .theme-explorer {
    background: transparent;
    border: 0;
    box-shadow: none;
    padding: 0;
  }

  .theme-explorer-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid var(--border-light);
    margin-bottom: 1rem;
    padding-bottom: 0.95rem;
  }

  .theme-explorer-lead {
    color: var(--text-muted);
    font-size: 0.98rem;
    line-height: 1.6;
    margin: 0.7rem 0 0;
    max-width: 74ch;
  }

  .theme-explorer-count {
    border: 1px solid color-mix(in srgb, var(--party-color) 26%, var(--border-light));
    border-radius: 999px;
    color: var(--party-color);
    font: 700 0.72rem/1 var(--font-mono, 'IBM Plex Mono', monospace);
    letter-spacing: 0.04em;
    padding: 0.5rem 0.75rem;
    white-space: nowrap;
  }

  .theme-explorer-grid {
    align-items: start;
    display: grid;
    gap: clamp(1rem, 2.2vw, 1.65rem);
    grid-template-columns: minmax(230px, 0.36fr) minmax(0, 1.64fr);
  }

  .theme-topic-nav {
    align-content: start;
    align-self: start;
    background: color-mix(in srgb, var(--surface) 86%, var(--party-soft));
    border: 1px solid color-mix(in srgb, var(--party-color) 13%, var(--border-light));
    border-radius: var(--radius, 12px);
    display: grid;
    gap: 0.28rem;
    height: fit-content;
    padding: 0.4rem;
  }

  .theme-topic-button {
    appearance: none;
    align-items: center;
    background: transparent;
    border: 1px solid transparent;
    border-left: 3px solid transparent;
    border-radius: 9px;
    color: var(--text);
    cursor: pointer;
    display: flex;
    gap: 0.58rem;
    min-height: 44px;
    overflow: hidden;
    padding: 0.52rem 0.6rem 0.52rem 0.5rem;
    position: relative;
    text-align: left;
    transition:
      transform 190ms ease,
      border-color 190ms ease,
      background 190ms ease,
      box-shadow 190ms ease,
      color 190ms ease;
  }

  .theme-topic-button:hover {
    background: color-mix(in srgb, var(--party-soft) 50%, var(--surface));
    border-color: color-mix(in srgb, var(--party-color) 20%, var(--border-light));
  }

  .theme-topic-button:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--party-color) 72%, white);
    outline-offset: 2px;
  }

  .theme-topic-button.active {
    background: color-mix(in srgb, var(--party-soft) 72%, var(--surface));
    border-color: color-mix(in srgb, var(--party-color) 24%, var(--border-light));
    border-left-color: var(--party-color);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--party-color) 12%, transparent),
      var(--shadow-sm);
  }

  .theme-topic-icon {
    align-items: center;
    background: color-mix(in srgb, var(--party-soft) 78%, var(--surface));
    border: 1px solid color-mix(in srgb, var(--party-color) 18%, transparent);
    border-radius: 999px;
    color: var(--party-color);
    display: inline-flex;
    flex: 0 0 auto;
    height: 24px;
    justify-content: center;
    width: 24px;
  }

  .theme-topic-icon svg {
    height: 13px;
    width: 13px;
  }

  .theme-icon {
    align-items: center;
    background: color-mix(in srgb, var(--party-soft) 78%, var(--surface));
    border: 1px solid color-mix(in srgb, var(--party-color) 25%, transparent);
    color: var(--party-color);
    display: inline-flex;
    justify-content: center;
  }

  .theme-icon.large {
    border-radius: 16px;
    flex: 0 0 auto;
    height: 50px;
    width: 50px;
  }

  .theme-icon.large svg {
    height: 25px;
    width: 25px;
  }

  .theme-title {
    color: var(--text);
    display: block;
    font-size: 0.9rem;
    font-weight: 760;
    hyphens: manual;
    line-height: 1.22;
    overflow-wrap: anywhere;
    word-break: normal;
  }

  .theme-cta {
    color: color-mix(in srgb, var(--party-color) 78%, var(--text-muted));
    display: block;
    font: 700 0.56rem/1.2 var(--font-mono, 'IBM Plex Mono', monospace);
    letter-spacing: 0.06em;
    margin-top: 0.14rem;
    text-transform: uppercase;
  }

  .theme-topic-text {
    min-width: 0;
  }

  .theme-detail-wrap {
    min-width: 0;
  }

  .theme-detail-card {
    animation: topic-detail-reveal 520ms cubic-bezier(0.16, 1, 0.3, 1);
    background:
      radial-gradient(circle at 96% 4%, color-mix(in srgb, var(--party-color) 13%, transparent), transparent 30%),
      linear-gradient(140deg, color-mix(in srgb, var(--surface) 94%, var(--party-soft)), var(--surface));
    border: 1px solid color-mix(in srgb, var(--party-color) 18%, var(--border-light));
    border-radius: var(--radius-lg, 16px);
    box-shadow: var(--shadow-sm);
    color: var(--text);
    min-height: 100%;
    overflow: hidden;
    padding: clamp(1.15rem, 2.25vw, 2rem);
    position: relative;
  }

  .theme-detail-card::before {
    background: var(--party-color);
    border-radius: 999px;
    content: '';
    height: calc(100% - 2rem);
    left: 1rem;
    opacity: 0.9;
    position: absolute;
    top: 1rem;
    width: 4px;
  }

  .theme-detail-top {
    align-items: center;
    display: flex;
    gap: 0.95rem;
    margin-bottom: 1.05rem;
    padding-left: 0.8rem;
    position: relative;
  }

  .theme-detail-top h4 {
    color: var(--text);
    font: 800 clamp(1.4rem, 2.4vw, 2rem)/1.05 var(--font-display, Georgia, serif);
    margin: 0;
  }

  .theme-focus {
    color: var(--text-muted);
    font-size: clamp(1.05rem, 1.4vw, 1.18rem);
    line-height: 1.58;
    margin: 0 0 1.25rem;
    padding-left: 0.8rem;
    position: relative;
  }

  .theme-detail-section {
    border-top: 1px solid var(--border-light);
    padding: 1rem 0 0 0.8rem;
    position: relative;
  }

  .theme-detail-section + .theme-detail-section {
    margin-top: 1rem;
  }

  .theme-detail-section p:last-child {
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.74;
    margin: 0;
  }

  .theme-detail-section.counter {
    background: color-mix(in srgb, var(--contra) 6%, transparent);
    border: 1px solid color-mix(in srgb, var(--contra) 18%, var(--border-light));
    border-radius: var(--radius, 12px);
    margin-top: 1rem;
    padding: 1rem 1rem 1rem 1.1rem;
  }

  .theme-detail-label {
    color: var(--party-color);
    font: 800 0.72rem/1.2 var(--font-mono, 'IBM Plex Mono', monospace);
    letter-spacing: 0.08em;
    margin: 0 0 0.45rem;
    text-transform: uppercase;
  }

  .theme-question-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-left: 0.8rem;
  }

  .theme-question-list span {
    background: color-mix(in srgb, var(--party-soft) 62%, var(--surface));
    border: 1px solid color-mix(in srgb, var(--party-color) 18%, var(--border-light));
    border-radius: 999px;
    color: var(--text);
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.25;
    padding: 0.45rem 0.7rem;
  }

  :global(html[data-theme='dark']) .party-hero {
    background:
      radial-gradient(circle at left 55%, color-mix(in srgb, var(--party-color) 22%, transparent), transparent 36%),
      linear-gradient(135deg, color-mix(in srgb, var(--surface-alt) 88%, var(--party-color)) 0%, var(--surface) 72%);
    border-bottom-color: var(--border-light);
  }

  :global(html[data-theme='dark']) .party-hero h1 {
    color: var(--text);
  }

  :global(html[data-theme='dark']) .party-hero .text-ink-muted {
    color: color-mix(in srgb, var(--text) 84%, var(--text-muted));
  }

  :global(html[data-theme='dark']) .party-hero-link,
  :global(html[data-theme='dark']) .party-hero-meta,
  :global(html[data-theme='dark']) .party-inline-accent,
  :global(html[data-theme='dark']) .theme-detail-label,
  :global(html[data-theme='dark']) .theme-cta,
  :global(html[data-theme='dark']) .theme-explorer-count {
    color: color-mix(in srgb, var(--party-color) 62%, white);
  }

  :global(html[data-theme='dark']) .party-hero-link:hover {
    color: color-mix(in srgb, var(--party-color) 48%, white);
  }

  :global(html[data-theme='dark']) .theme-detail-card {
    background:
      radial-gradient(circle at 96% 4%, color-mix(in srgb, var(--party-color) 15%, transparent), transparent 30%),
      linear-gradient(140deg, color-mix(in srgb, var(--surface-alt) 90%, var(--party-color)), var(--surface));
    border-color: color-mix(in srgb, var(--party-color) 28%, var(--border));
  }

  :global(html[data-theme='dark']) .theme-question-list span {
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--party-color) 22%, var(--surface-alt)), var(--surface-alt));
    border-color: color-mix(in srgb, var(--party-color) 42%, var(--border));
    color: var(--text);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  :global(html[data-theme='dark']) .theme-explorer {
    background: transparent;
  }

  :global(html[data-theme='dark']) .theme-explorer-head {
    border-bottom-color: color-mix(in srgb, var(--text) 18%, var(--border));
  }

  :global(html[data-theme='dark']) .theme-explorer-lead,
  :global(html[data-theme='dark']) .theme-focus,
  :global(html[data-theme='dark']) .theme-detail-section p:last-child {
    color: color-mix(in srgb, var(--text) 82%, var(--text-muted));
  }

  :global(html[data-theme='dark']) .theme-detail-top h4,
  :global(html[data-theme='dark']) .theme-title {
    color: var(--text);
  }

  :global(html[data-theme='dark']) .theme-topic-nav {
    background: color-mix(in srgb, var(--surface-alt) 92%, var(--party-color));
    border-color: color-mix(in srgb, var(--party-color) 28%, var(--border));
  }

  :global(html[data-theme='dark']) .theme-topic-button:hover {
    background: color-mix(in srgb, var(--surface-alt) 82%, var(--party-color));
    border-color: color-mix(in srgb, var(--party-color) 30%, var(--border));
  }

  :global(html[data-theme='dark']) .theme-topic-button.active {
    background: color-mix(in srgb, var(--surface-alt) 72%, var(--party-color));
    border-color: color-mix(in srgb, var(--party-color) 32%, var(--border));
    border-left-color: var(--party-color);
  }

  :global(html[data-theme='dark']) .theme-topic-icon {
    background: color-mix(in srgb, var(--surface) 70%, var(--party-color));
    border-color: color-mix(in srgb, var(--party-color) 38%, var(--border));
  }

  @keyframes topic-detail-reveal {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 980px) {
    .theme-explorer-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 620px) {
    .theme-explorer-head {
      align-items: flex-start;
      flex-direction: column;
    }

    .theme-topic-nav {
      gap: 0.35rem;
      padding: 0.45rem;
    }

    .theme-topic-button {
      min-height: 50px;
      padding: 0.62rem 0.65rem;
    }
  }

  @media (max-width: 420px) {
    .theme-topic-button {
      min-height: 48px;
    }
  }
</style>

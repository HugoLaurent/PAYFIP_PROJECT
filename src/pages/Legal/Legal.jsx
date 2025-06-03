const Legal = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Mentions légales</h1>
        <p>
          <strong>Éditeur du site</strong>
          <br />
          Ce site est édité par l&apos;entreprise <strong>AREGIE</strong>, dont
          le siège est situé à :<br />
          <em>Neuilly-sur-Seine 92200</em>
        </p>
        <p>
          <strong>Directeur de la publication</strong> : AREGIE
        </p>
        <p>
          <strong>Contact</strong> : <em>a-regie@aregie.com</em>
        </p>
        <p>
          <strong>Hébergement</strong>
          <br />
          Le site est hébergé par la société <strong>IONOS SARL</strong>,<br />
          7 place de la Gare, 57200 Sarreguemines, France
          <br />
          Site web :{" "}
          <a
            href="https://www.ionos.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.ionos.fr
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Politique de confidentialité
        </h2>
        <p>
          <em>Dernière mise à jour : juin 2025</em>
        </p>
        <p>
          Ce site, édité par <strong>AREGIE</strong>, permet la vérification
          d’adresse email, la réservation de billets et l’envoi d’informations
          par email, notamment via le service de messagerie Microsoft Outlook.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          1. Données personnelles collectées
        </h3>
        <p>
          Lors de l’utilisation du site, les données suivantes peuvent être
          collectées :
          <br />
          - Adresse e-mail
          <br />
          - Code de vérification à usage unique
          <br />
          - Données de réservation (billets, date, montant)
          <br />- Date et heure d’accès
        </p>
        <br />
        <p>
          Ces données sont utilisées exclusivement pour :<br />
          - Envoyer un code de vérification par email
          <br />
          - Transmettre les billets à l’utilisateur
          <br />- Assurer un suivi administratif et permettre la réémission des
          réservations si nécessaire
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          2. Base légale du traitement
        </h3>
        <p>
          Le traitement est basé sur :
          <br />- L’intérêt légitime d’assurer la sécurité des accès
          <br />- L’exécution d’un contrat lors de la réservation
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          3. Durée de conservation
        </h3>
        <p>
          Les codes de vérification sont conservés quelques minutes puis
          supprimés automatiquement.
          <br />
          Les données de réservation sont conservées pendant une durée limitée
          (maximum 12 mois) pour répondre aux obligations légales et permettre
          la réémission des billets.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h3>
        <p>
          Ce site <strong>n’utilise aucun cookie non essentiel</strong>{" "}
          (publicité, tracking, analytics, etc.). Aucun consentement n’est
          requis.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          5. Partage de données
        </h3>
        <p>
          Les données ne sont <strong>jamais vendues</strong> à des tiers.
          <br />
          Les emails sont envoyés via les serveurs sécurisés de Microsoft
          Outlook. Les données sont hébergées en Europe chez IONOS.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          6. Droits des utilisateurs
        </h3>
        <p>
          Conformément au RGPD, vous pouvez demander :<br />
          - L’accès à vos données
          <br />
          - Leur rectification ou suppression
          <br />- Une limitation du traitement
        </p>
        <p>
          Pour toute demande relative à vos données personnelles, contactez-nous
          à : <em>a-regie@aregie.com</em>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">7. Contact</h3>
        <p>
          Responsable du traitement : <strong>AREGIE</strong>
          <br />
          Email : <em>a-regie@aregie.com</em>
        </p>
      </section>
    </div>
  );
};

export default Legal;

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    backgroundColor: "#f9fafb",
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#111827",
  },
  container: {
    width: "100%",
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  header: {
    backgroundColor: "#1d4ed8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#fdfdfd",
    textAlign: "center",
    marginTop: 4,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    textAlign: "right",
    maxWidth: "70%",
  },
  qrContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  qrImage: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
  footer: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    fontSize: 10,
    textAlign: "center",
    color: "#6b7280",
  },
});

export default function PDFTicket({
  email,
  date,
  confirmationNumber,
  tickets,
  totalPrice,
  qrCodeUrl,
}) {
  const totalBillets = tickets.reduce((acc, t) => acc + t.quantity, 0);
  const billetsText = tickets
    .map(
      (ticket) =>
        `${ticket.quantity} × ${ticket.type} — ${(
          ticket.price * ticket.quantity
        ).toFixed(2)} €`
    )
    .join(" / ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🎉 Réservation Confirmée !</Text>
            <Text style={styles.subtitle}>
              Vos billets ont bien été réservés.
            </Text>
          </View>

          {/* Body */}
          <View style={styles.section}>
            <Text style={styles.label}>📧 Email :</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>🔢 Code :</Text>
            <Text style={styles.value}>{confirmationNumber}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>📅 Date de la réservation :</Text>
            <Text style={styles.value}>
              {format(date, "EEEE dd MMMM yyyy", { locale: fr })}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>💰 Montant total :</Text>
            <Text style={styles.value}>{totalPrice.toFixed(2)} €</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>🎫 Ticket valable pour :</Text>
            <Text style={styles.value}>{billetsText}</Text>
          </View>

          {/* QR Code */}
          {qrCodeUrl && (
            <View style={styles.qrContainer}>
              <Image src={qrCodeUrl} style={styles.qrImage} />
              <Text style={{ fontSize: 10, color: "#6b7280" }}>
                Présentez ce QR code lors de votre entrée.
              </Text>
            </View>
          )}

          {/* Footer */}
          <Text style={styles.footer}>
            Un service de billetterie sécurisé proposé par AREGIE
          </Text>
        </View>
      </Page>
    </Document>
  );
}

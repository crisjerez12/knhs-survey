import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

// Define interfaces for our data structures
interface ReservationData {
  location: string;
  mobile_number: string;
  name: string;
  notes: string;
  package: string;
  pax: string;
  reservation_date: string;
  total_price: number;
}

interface Item {
  name: string;
  price: string;
  quantity: number;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column" as const,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center" as const,
    color: "#4a5568",
  },
  subheader: {
    fontSize: 12,
    marginBottom: 5,
  },
  text: {
    fontSize: 8,
    marginBottom: 3,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    alignSelf: "center" as const,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row" as const,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 3,
    fontSize: 6,
  },
});

interface MyDocumentProps {
  reservationData: ReservationData;
  items?: Item[]; //Added optional items
  total?: number; //Added optional total
}

const MyDocument: React.FC<MyDocumentProps> = ({
  reservationData,
  items,
  total,
}) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <Image src="/logo.png" style={styles.logo} />
      <Text style={styles.header}>Lechem-Cuizine Reservation Receipt</Text>
      <View style={styles.section}>
        <Text style={styles.subheader}>Reservation Information</Text>
        <Text style={styles.text}>
          Date: {reservationData.reservation_date}
        </Text>
        <Text style={styles.text}>Name: {reservationData.name}</Text>
        <Text style={styles.text}>Location: {reservationData.location}</Text>
        <Text style={styles.text}>Mobile: {reservationData.mobile_number}</Text>
        <Text style={styles.text}>Notes: {reservationData.notes || "N/A"}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subheader}>Package Details</Text>
        <Text style={styles.text}>Package: {reservationData.package}</Text>
        <Text style={styles.text}>Number of Guests: {reservationData.pax}</Text>
        <Text style={styles.text}>
          Total Price: ₱{reservationData.total_price.toLocaleString()}
        </Text>
      </View>
      {items && ( //Conditional rendering of order details
        <View style={styles.section}>
          <Text style={styles.subheader}>Order Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Item</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Price</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Quantity</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
            </View>
            {items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.price.replace("₱", "")}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {(
                      Number.parseFloat(
                        item.price.replace("₱", "").replace(",", "")
                      ) * item.quantity
                    ).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {total && (
            <Text
              style={[
                styles.text,
                { marginTop: 10, fontWeight: "bold" as const },
              ]}
            >
              Total: {total.toLocaleString()} pesos
            </Text>
          )}
        </View>
      )}
    </Page>
  </Document>
);

export const generatePDF = async (
  reservationData: ReservationData,
  items?: Item[],
  total?: number
): Promise<void> => {
  const blob = await pdf(
    <MyDocument reservationData={reservationData} items={items} total={total} />
  ).toBlob();
  saveAs(blob, "Lechem-Cuizine-Reservation-Receipt.pdf");
};

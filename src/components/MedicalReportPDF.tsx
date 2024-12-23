import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer';

// Interfaces remain the same

interface PatientData {
  name: string;
  id: string;
  age: number;
  course: string;
  date: string;
  time: string;
  designation: string;
  residenceType: string;
  sex: string;
  meds: Array<{
    name: string;
    dosageMorning: string;
    dosageAfternoon: string;
    dosageEvening: string;
    duration: string;
    suggestion: string;
  }>
}

interface MedicalReportProps {
  ndata: PatientData;
  diagnosis: string;
  dietaryRemarks: string;
  testNeeded: string;
  doctorName: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: 'white',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: '2 solid #000',
  },
  logo: {
    width: 70,
    height: 70,
    objectFit: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
  },
  dateTime: {
    fontSize: 11,
    color: '#000',
    marginBottom: 2,
  },
  divider: {
    borderBottom: '1 solid #000',
    marginVertical: 10,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 15,
  },
  infoColumn: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    width: '45%',
    fontSize: 11,
    color: '#000',
  },
  value: {
    width: '55%',
    backgroundColor: '#f7fafc',
    padding: '4 6',
    borderRadius: 4,
    fontSize: 11,
    color: '#000',
    borderColor: '#000',
    borderWidth: 1,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  textArea: {
    backgroundColor: '#f7fafc',
    padding: 8,
    minHeight: 50,
    borderRadius: 4,
    fontSize: 11,
    lineHeight: 1.4,
    color: '#000',
    borderColor: '#000',
    borderWidth: 1,
  },
  table: {
    width: 'auto',
    marginVertical: 8,
    borderColor: '#000',
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
  },
  tableHeaderCell: {
    padding: '6 4',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  tableCell: {
    padding: '6 4',
    fontSize: 10,
    color: '#000',
    borderRightColor: '#000',
    borderRightWidth: 1,
  },
  dosageTable: {
    width: '100%',
  },
  dosageRow: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  dosageHeaderCell: {
    flex: 1,
    padding: 4,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    color: '#000',
  },
  dosageCell: {
    flex: 1,
    padding: 4,
    fontSize: 9,
    textAlign: 'center',
    color: '#000',
  },
  signature: {
    marginTop: 30,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  signatureTitle: {
    fontSize: 11,
    color: '#000',
    marginTop: 2,
  },
  signatureDivider: {
    width: 200,
    borderBottom: '1 solid #000',
    marginBottom: 5,
  }
});

// Component remains the same
const MedicalReportPDF: React.FC<MedicalReportProps> = ({
  ndata,
  diagnosis,
  dietaryRemarks,
  testNeeded,
  doctorName
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image src="/upes-logo.jpg" style={styles.logo} />
        <Text style={styles.title}>UHS</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTime}>{ndata?.time}</Text>
          <Text style={styles.dateTime}>{ndata?.date}</Text>
        </View>
      </View>

      {/* Patient Information */}
      <View style={styles.infoSection}>
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{ndata?.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{ndata?.id}</Text>
          </View>
        </View>

        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{ndata?.age}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>School:</Text>
            <Text style={styles.value}>{ndata?.course}</Text>
          </View>
        </View>

        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Sex:</Text>
            <Text style={styles.value}>{ndata?.sex}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Residence Type:</Text>
            <Text style={styles.value}>{ndata?.residenceType}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Diagnosis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diagnosis</Text>
        <Text style={styles.textArea}>{diagnosis}</Text>
      </View>

      {/* Medicine Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medicine</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableHeaderCell, { width: '5%' }]}>No.</Text>
            <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Medicine</Text>
            <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Dosage (/day)</Text>
            <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Duration</Text>
            <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Suggestions</Text>
          </View>

          {ndata.meds.map((med, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '5%' }]}>{index + 1}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{med.name}</Text>
              <View style={[styles.tableCell, { width: '30%', padding: 0 }]}>
                <View style={styles.dosageTable}>
                  <View style={styles.dosageRow}>
                    <Text style={styles.dosageHeaderCell}>Morning</Text>
                    <Text style={styles.dosageHeaderCell}>Afternoon</Text>
                    <Text style={styles.dosageHeaderCell}>Evening</Text>
                  </View>
                  <View style={styles.dosageRow}>
                    <Text style={styles.dosageCell}>{med.dosageMorning}</Text>
                    <Text style={styles.dosageCell}>{med.dosageAfternoon}</Text>
                    <Text style={styles.dosageCell}>{med.dosageEvening}</Text>
                  </View>
                </View>
              </View>
              <Text style={[styles.tableCell, { width: '10%' }]}>{med.duration}</Text>
              <Text style={[styles.tableCell, { width: '30%', borderRightWidth: 0 }]}>{med.suggestion}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <Text style={styles.textArea}>{dietaryRemarks}</Text>
      </View>

      {/* Tests Needed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tests Needed</Text>
        <Text style={styles.textArea}>{testNeeded}</Text>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <View style={styles.signatureDivider} />
        <Text style={styles.signatureName}>{doctorName}</Text>
        <Text style={styles.signatureTitle}>{ndata?.designation}</Text>
        <Text style={styles.signatureTitle}>Doctor</Text>
      </View>
    </Page>
  </Document>
);

export default MedicalReportPDF;
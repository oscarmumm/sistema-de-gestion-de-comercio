import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatMoney } from '../utils/utils';
import { format } from 'date-fns';
import type { Invoice } from '../types';

type InvoicePDFProps = {
    invoice: Invoice;
};

export const InvoicePDF = ({ invoice }: InvoicePDFProps) => {
    return (
        <Document>
            <Page>
                <View>
                    <Text></Text>
                </View>
            </Page>
        </Document>
    );
};

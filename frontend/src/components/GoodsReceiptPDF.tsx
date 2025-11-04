import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { GoodsReceipt } from '../types';

type GoodsReceiptPDFProps = {
    receipt: GoodsReceipt;
};

export const GoodsReceiptPDF = ({ receipt }: GoodsReceiptPDFProps) => {
    return (
        <Document>
            <Page size="A4">
                <Text>Remito de Ingreso de Mercadería</Text>
                <View>
                    <Text>Fecha: {`${receipt.entry_date}`}</Text>
                    <Text>Proveedor: {`${receipt.supplier_id}`}</Text>
                </View>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            </Page>
        </Document>
    );
};

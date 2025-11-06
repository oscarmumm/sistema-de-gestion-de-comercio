import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatMoney } from '../utils/utils';
import { format } from 'date-fns';
import type { Invoice } from '../types';

type InvoicePDFProps = {
    invoice: Invoice;
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid #ccc',
        paddingVertical: 4,
    },
    cell: {
        flex: 1,
        paddingHorizontal: 4,
    },
    headerRow: {
        backgroundColor: '#eee',
        fontWeight: 'bold',
    },
    total: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'right',
    },
    username: {
        fontSize: 10,
        marginTop: 10,
    },
});

export const InvoicePDF = ({ invoice }: InvoicePDFProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>
                    Comprobante de Venta
                </Text>

                <View style={styles.section}>
                    <Text>Fecha: {format(invoice.date, 'dd-MM-yyyy')}</Text>
                    <Text>Hora: {format(invoice.date, 'kk:mm')}</Text>
                    <Text>Método de Pago: {invoice.payment_method}</Text>
                </View>

                <Text style={styles.subtitle}>Detalle: </Text>
                <View style={[styles.row, styles.headerRow]}>
                    <Text style={styles.cell}>Nombre</Text>
                    <Text style={styles.cell}>Cantidad</Text>
                    <Text style={styles.cell}>Precio</Text>
                    <Text style={styles.cell}>Importe</Text>
                </View>
                {invoice.products.map((product) => (
                    <View key={product.product_id} style={styles.row}>
                        <Text style={styles.cell}>{product.name}</Text>
                        <Text style={styles.cell}>{product.quantity}</Text>
                        <Text style={styles.cell}>
                            {formatMoney(parseFloat(product.unit_price))}
                        </Text>
                        <Text style={styles.cell}>
                            {formatMoney(
                                product.quantity *
                                    parseFloat(product.unit_price)
                            )}
                        </Text>
                    </View>
                ))}
                <Text style={styles.total}>Total: {formatMoney(invoice.total)}</Text>
                <Text>Ingresado por: {invoice.username}</Text>
            </Page>
        </Document>
    );
};

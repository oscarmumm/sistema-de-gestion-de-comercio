import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { GoodsReceipt } from '../types';
import { formatMoney } from '../utils/utils';
import { format } from 'date-fns';

type GoodsReceiptPDFProps = {
    receipt: GoodsReceipt;
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

export const GoodsReceiptPDF = ({ receipt }: GoodsReceiptPDFProps) => {
    console.log(receipt);
    const total = receipt.products.reduce((total, product) => {
        return (
            total +
            parseFloat(product.unit_cost) *
                product.units_per_box *
                product.boxes
        );
    }, 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>
                    Comprobante de Ingreso de Mercadería
                </Text>

                <View style={styles.section}>
                    <Text>
                        Fecha: {format(receipt.entry_date, 'dd-MM-yyyy')}
                    </Text>
                    <Text>Hora: {format(receipt.entry_date, 'kk:mm')}</Text>
                    <Text>Proveedor: {receipt.supplier_name}</Text>
                    <Text>Nro. de remito: {receipt.receipt_code}</Text>
                </View>

                <Text style={styles.subtitle}>Detalle: </Text>
                <View style={[styles.row, styles.headerRow]}>
                    <Text style={styles.cell}>Nombre</Text>
                    <Text style={styles.cell}>Cajas</Text>
                    <Text style={styles.cell}>Precio por unidad</Text>
                    <Text style={styles.cell}>Unidades por caja</Text>
                    <Text style={styles.cell}>Importe</Text>
                </View>
                {receipt.products.map((product) => (
                    <View key={product.product_id} style={styles.row}>
                        <Text style={styles.cell}>{product.name}</Text>
                        <Text style={styles.cell}>{product.boxes}</Text>
                        <Text style={styles.cell}>
                            {formatMoney(parseFloat(product.unit_cost))}
                        </Text>
                        <Text style={styles.cell}>{product.units_per_box}</Text>
                        <Text style={styles.cell}>
                            {formatMoney(
                                product.units_per_box *
                                    parseFloat(product.unit_cost) *
                                    product.boxes
                            )}
                        </Text>
                    </View>
                ))}
                <Text style={styles.total}>Total: {formatMoney(total)}</Text>
                <Text>Ingresado por: {receipt.username}</Text>
            </Page>
        </Document>
    );
};

"use client"

import { useEffect, useMemo } from "react";
import { useAppStore } from "@/store";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export interface Transaction {
    id: number;
    sku: string;
    qty: number;
    amount: number;
}

export default function TransactionPage() {

    const authCredentials = useAppStore((state) => state.authCredentials)
    const setTransactions = useAppStore((state) => state.setTransactions)

    const transactions = useAppStore((state) => state.transactions)

    const headers = useMemo(() => {
        const h = new Headers();
        h.append('Authorization', authCredentials());
        return h;
    }, [authCredentials]);

    useEffect(() => {
            fetch(`http://127.0.0.1:8080/adjustment-transaction`, { headers })
            .then((res) => res.json())
            .then((response) => {
                if(transactions.length) {
                    const transactionArray = new Set([...transactions, ...response.data]);
                    setTransactions([...transactionArray]);
                } else {
                    setTransactions(response.data);
                }
            });

            return () => {
            setTransactions([]);
          };
    }, []);
      
    return (
        <div className="items-center justify-items-center w-full h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                adjustment transaction page
                <div className="flex flex-wrap gap-4">
                    {transactions.length ? (
                        <Table>
                            <TableCaption>A list of recent transactions.</TableCaption>
                            <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">SKU</TableHead>
                                <TableHead>QTY</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {transactions.map((transaction, key) => (
                                <TableRow key={key}>
                                <TableCell className="font-medium">{transaction.sku}</TableCell>
                                <TableCell>{transaction.qty}</TableCell>
                                <TableCell className="text-right">{transaction.amount}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                            <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                            </TableFooter>
                        </Table>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <span>Empty Data</span> 
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
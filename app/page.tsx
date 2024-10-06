"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TablePage: React.FC = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { t } = useTranslation('common');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                setError(t("User is not authenticated."));
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:8000/api/trustee/order-transactions/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    setData(result.results);
                } else {
                    setError(t("Failed to fetch data."));
                }
            } catch (err) {
                setError(t("An error occurred while fetching data."));
            }
        };

        fetchData();
    }, [t]);

    return (
        <div>
            <h1>{t('order_transactions')}</h1>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Owner</th>
                        <th>External Order ID</th>
                        <th>Status</th>
                        <th>Order Type</th>
                        <th>Contribution Type</th>
                        <th>Number of Units</th>
                        <th>Purchase Price</th>
                        <th>Currency</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.owner}</td>
                            <td>{item.external_order_id}</td>
                            <td>{item.status}</td>
                            <td>{item.order_type}</td>
                            <td>{item.contribution_type || "N/A"}</td>
                            <td>{item.number_of_units}</td>
                            <td>{item.purchase_price}</td>
                            <td>{item.currency}</td>
                            <td>{new Date(item.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablePage;

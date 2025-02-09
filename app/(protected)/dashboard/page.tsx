"use client";

import { useEffect, useState } from "react";
import { getDonations } from "@/lib/actions/donations.actions";
import { Card, Col, Empty, Row, Typography, Spin } from "antd";
import { IDonation } from "@/types/IDonnation";

const { Title, Text } = Typography;

const Page = () => {

  const [donations, setDonations] = useState<IDonation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDonations = await getDonations();
        setDonations(fetchedDonations);
      } catch (error) {
        console.error("Erreur lors du chargement des donations :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <Title level={2} className="mb-6 text-gray-800">Liste des Donations</Title>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : donations.length > 0 ? (
        <Row gutter={[16, 16]}>
          {donations.map((donation) => (
            <Col key={donation._id.toString()} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={`Donation #${donation._id.toString().slice(-5)}`} // Affiche les 5 derniers caractères de l'ID
                bordered={false}
                hoverable
              >
                <div className="flex flex-col gap-2">
                  <Text strong>Montant:</Text>
                  <Text>{donation.amount}€</Text>

                  <Text strong>Type:</Text>
                  <Text>{donation.type}</Text>

                  <Text strong>Date:</Text>
                  <Text>{new Date(donation.date).toLocaleDateString('fr-FR')}</Text>

                  <Text strong>Note:</Text>
                  <Text>{donation.notes || "N/A"}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="Aucune donation trouvée" className="mt-6" />
      )}
    </div>
  );
};

export default Page;

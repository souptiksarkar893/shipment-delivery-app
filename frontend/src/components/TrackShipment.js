import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Container, ListGroup } from 'react-bootstrap';

function TrackShipment() {
  const [shipments, setShipments] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchShipments = async () => {
      if (!currentUser) return;

      const q = query(collection(db, 'shipments'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const shipmentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShipments(shipmentList);
    };

    fetchShipments();
  }, [currentUser]);

  return (
    <Container className="mt-5">
      <h2>Track Shipment</h2>
      <ListGroup>
        {shipments.map(shipment => (
          <ListGroup.Item key={shipment.id}>
            <div><strong>Sender:</strong> {shipment.sender}</div>
            <div><strong>Receiver:</strong> {shipment.receiver}</div>
            <div><strong>Package Size:</strong> {shipment.packageSize}</div>
            <div><strong>Address:</strong> {shipment.address}</div>
            <div><strong>Status:</strong> {shipment.status}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default TrackShipment;

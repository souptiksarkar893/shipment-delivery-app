import React, { useState } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Container } from 'react-bootstrap';

function NewShipment() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [packageSize, setPackageSize] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const { currentUser } = useAuth();

  const handleNewShipment = async () => {
    console.log('Creating new shipment...');

    try {
      if (!currentUser) {
        alert('You need to be logged in to create a shipment');
        return;
      }

      console.log('Current user:', currentUser);

      console.log('Adding document to Firestore...');
      const docRef = await addDoc(collection(db, 'shipments'), {
        sender,
        receiver,
        packageSize,
        address,
        status: 'Pending',
        userId: currentUser.uid,
      });
      console.log('Document added with ID:', docRef.id);

      console.log('Sending POST request to create-order...');
      const response = await axios.post('http://localhost:8080/create-order', { amount: amount * 100 });
      console.log('Create order response:', response.data);

      const { id: order_id, currency } = response.data;
      console.log('Order created with ID:', order_id);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency,
        name: 'Shipment Delivery',
        description: `Payment for shipment ${docRef.id}`,
        order_id,
        handler: function (response) {
          console.log('Payment successful!', response);
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: sender,
          email: '',
          contact: '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      console.log('Razorpay options:', options);

      if (window.Razorpay) {
        console.log('Opening Razorpay...');
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          alert('Payment failed. Please try again.');
        });
      } else {
        console.error('Razorpay script not loaded');
        alert('Razorpay script not loaded. Please try again.');
      }

    } catch (error) {
      console.error('Error creating new shipment:', error);
      alert(`Error creating new shipment: ${error.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create New Shipment</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Sender</Form.Label>
          <Form.Control type="text" value={sender} onChange={(e) => setSender(e.target.value)} placeholder="Sender" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Receiver</Form.Label>
          <Form.Control type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="Receiver" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Package Size</Form.Label>
          <Form.Control type="text" value={packageSize} onChange={(e) => setPackageSize(e.target.value)} placeholder="Package Size" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery Address" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
        </Form.Group>
        <Button variant="primary" onClick={handleNewShipment}>Create Shipment</Button>
      </Form>
    </Container>
  );
}

export default NewShipment;

import React, { useState, useEffect } from 'react';
import Add from './Add';
import Edit from './Edit';
import ContactsTable from './Table';
import axios from 'axios';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContact, setEditContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="dashboard-container">
      {!isAdding && !isEditing && (
        <>
          <h1>Contact Management</h1>
          <button onClick={() => setIsAdding(true)} className="button">Add Contact</button>
          <ContactsTable
            contacts={contacts}
            fetchContacts={fetchContacts}
            setIsEditing={setIsEditing}
            setEditContact={setEditContact}
          />
        </>
      )}
      {isAdding && <Add fetchContacts={fetchContacts} setIsAdding={setIsAdding} />}
      {isEditing && <Edit fetchContacts={fetchContacts} setIsEditing={setIsEditing} />}
    </div>
  );
};

export default Dashboard;

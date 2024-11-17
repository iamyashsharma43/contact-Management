import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Header from './Header';
import ContactsTable from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [contacts, setContacts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleEdit = (contact) => {
    // Save contact details to localStorage for editing
    localStorage.setItem('contactId', contact._id);
    localStorage.setItem('firstName', contact.firstName);
    localStorage.setItem('lastName', contact.lastName);
    localStorage.setItem('email', contact.email);
    localStorage.setItem('phoneNumber', contact.phoneNumber);
    localStorage.setItem('company', contact.company || '');
    localStorage.setItem('jobTitle', contact.jobTitle || '');
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/contacts/${id}`);
          Swal.fire('Deleted!', 'The contact has been deleted.', 'success');
          fetchContacts();
        } catch (err) {
          Swal.fire('Error!', 'Failed to delete the contact.', 'error');
          console.error(err);
        }
      }
    });
  };

  return (
    <div className="dashboard-container">
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} setIsAuthenticated={setIsAuthenticated} />
          <ContactsTable
            contacts={contacts}
            fetchContacts={fetchContacts}
            setIsEditing={setIsEditing}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && <Add fetchContacts={fetchContacts} setIsAdding={setIsAdding} />}
      {isEditing && <Edit fetchContacts={fetchContacts} setIsEditing={setIsEditing} />}
    </div>
  );
};

export default Dashboard;

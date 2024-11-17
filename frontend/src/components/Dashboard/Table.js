import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ContactsTable = ({ contacts, fetchContacts, setIsEditing, setEditContact }) => {
  const handleEdit = (contact) => {
    // Save contact details to localStorage for editing
    localStorage.setItem('contactId', contact._id);
    localStorage.setItem('firstName', contact.firstName);
    localStorage.setItem('lastName', contact.lastName);
    localStorage.setItem('email', contact.email);
    localStorage.setItem('phoneNumber', contact.phoneNumber);
    localStorage.setItem('company', contact.company || '');
    localStorage.setItem('jobTitle', contact.jobTitle || '');

    setEditContact(contact);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/contacts/${id}`);
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>{contact.company || 'N/A'}</TableCell>
              <TableCell>{contact.jobTitle || 'N/A'}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(contact)}
                  style={{ marginRight: '8px' }}
                >
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(contact._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;

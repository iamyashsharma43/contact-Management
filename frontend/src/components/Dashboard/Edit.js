import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit = ({ setIsEditing, fetchContacts }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [contactId, setContactId] = useState('');

  useEffect(() => {
    // Retrieve contact details from localStorage
    setContactId(localStorage.getItem('contactId'));
    setFirstName(localStorage.getItem('firstName'));
    setLastName(localStorage.getItem('lastName'));
    setEmail(localStorage.getItem('email'));
    setPhoneNumber(localStorage.getItem('phoneNumber'));
    setCompany(localStorage.getItem('company') || '');
    setJobTitle(localStorage.getItem('jobTitle') || '');
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'First Name, Last Name, Email, and Phone Number are required.',
        showConfirmButton: true,
      });
    }

    try {
      // Update the contact in the backend
      await axios.patch(`http://localhost:3000/contacts/${contactId}`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        jobTitle,
      });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Contact has been successfully updated.',
        showConfirmButton: false,
        timer: 1500,
      });

      // Refresh the contact list and close the edit form
      fetchContacts();
      setIsEditing(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update contact. Please try again.',
        showConfirmButton: true,
      });
      console.error(err);
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Contact</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <label htmlFor="jobTitle">Job Title</label>
        <input
          id="jobTitle"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;

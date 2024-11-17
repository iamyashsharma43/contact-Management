import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Add = ({ fetchContacts, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = async (e) => {
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
      // Add new contact to the backend
      await axios.post('http://localhost:3000/contacts', {
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        jobTitle,
      });

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Contact has been successfully added.',
        showConfirmButton: false,
        timer: 1500,
      });

      // Refresh the contact list and close the add form
      fetchContacts();
      setIsAdding(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add contact. Please try again.',
        showConfirmButton: true,
      });
      console.error(err);
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleSubmit}>
        <h1>Add Contact</h1>
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;

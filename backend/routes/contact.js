const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventory_model');

// GET /contacts - Retrieve all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Inventory.find();
        res.status(200).json(contacts);
    } catch (err) {
        console.error('Error retrieving contacts:', err);
        res.status(500).json({ message: 'Failed to retrieve contacts.' });
    }
});

// GET /contacts/:id - Retrieve a specific contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Inventory.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        res.status(200).json(contact);
    } catch (err) {
        console.error('Error retrieving contact:', err);
        res.status(500).json({ message: 'Failed to retrieve contact.' });
    }
});

// POST /contacts - Add a new contact
router.post('/', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber) {
        return res.status(400).json({ message: 'First Name, Last Name, Email, and Phone Number are required.' });
    }

    // Create new contact
    const newContact = new Inventory({
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        jobTitle,
    });

    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        if (err.code === 11000) { // Handle duplicate entry errors
            res.status(400).json({ message: 'Duplicate entry detected.' });
        } else {
            console.error('Error saving contact:', err);
            res.status(500).json({ message: 'Failed to add contact.' });
        }
    }
});

// PATCH /contacts/:id - Update a specific contact
router.patch('/:id', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber) {
        return res.status(400).json({ message: 'First Name, Last Name, Email, and Phone Number are required.' });
    }

    try {
        const contact = await Inventory.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        // Update contact details
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.email = email;
        contact.phoneNumber = phoneNumber;
        contact.company = company;
        contact.jobTitle = jobTitle;

        const updatedContact = await contact.save();
        res.status(200).json(updatedContact);
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).json({ message: 'Failed to update contact.' });
    }
});

// DELETE /contacts/:id - Delete a specific contact
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Inventory.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        await contact.deleteOne();
        res.status(200).json({ message: 'Contact deleted successfully.' });
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).json({ message: 'Failed to delete contact.' });
    }
});

module.exports = router;

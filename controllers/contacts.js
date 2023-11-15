const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res, next) => {
  // #swagger.tags=['Get All Contacts']
  try {
    const result = await mongodb.getDb().db().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    res.status(500).json({ error: 'An error occurred while fetching contacts.' });
  }
};

const getContact = async (req, res, next) => {
  // #swagger.tags=['Get Contact']
  const contactId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'An error occurred while fetching the contact.' });
  }
};

const createContact = async (req, res, next) => {
  // #swagger.tags=['Create Contact']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  try {
    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (result.acknowledged) {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json({ id: result.insertedId, ...contact });
    } else {
      throw new Error('Insert failed');
    }
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateContact = async (req, res, next) => {
  // #swagger.tags=['Update Contact']
  const contactId = new ObjectId(req.params.id);
  const contact = req.body;
  try {
    const result = await mongodb.getDb().db().collection('contacts').updateOne({ _id: contactId }, { $set: contact });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ update: result, ...contact});
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'An error occurred while updating the contact.' });
  }
}

const deleteContact = async (req, res, next) => {
  // #swagger.tags=['Delete Contact']
  const contactId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ id: contactId, result: result });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'An error occurred while deleting the contact.' });
  }
};

module.exports = { 
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};

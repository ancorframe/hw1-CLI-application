const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");


async function listContacts() {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return console.table(list);;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contact = list.find(({ id }) => id === contactId);
    return console.log(contact);;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newList =  JSON.stringify(list.filter(({ id }) => id !== contactId));
     await fs.writeFile(contactsPath, newList);
    return console.log("Contact remove");;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const newList = JSON.stringify([...list, newContact]);
    await fs.writeFile(contactsPath, newList);
    return console.log(`${name} added to contacts`);;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

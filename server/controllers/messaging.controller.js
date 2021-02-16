const Async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const ContactGroup = require("../models/contactGroup.model");
const Message = require("../models/message.model");
const codeBits = require("../lib/code.bits");

exports.getContactList = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ user: _id })
    .populate("partner")
    .populate("lastMessage");

  return res.status(200).send({ contacts });
};
exports.startConversation = async (req, res) => {
  const { contact } = req.params;
  const { _id } = req.user;

  const existingContact = await Contact.findOne({
    user: _id,
    partner: contact,
  });

  if (existingContact) {
    return res.status(200).send({
      success: true,
      conversation_id: existingContact.conversation_id,
    });
  }

  const contactGroup = ContactGroup({ user: _id, contact });
  const conversation_id = contactGroup._id;
  contactGroup.save();
  const contactOne = Contact({
    conversation_id,
    user: _id,
    partner: contact,
  });
  const contactTwo = Contact({
    conversation_id,
    user: contact,
    partner: _id,
  });
  contactOne.save();
  contactTwo.save();

  res.status(200).send({ success: true, conversation_id: contactGroup._id });
};
const sendText = async (req, res) => {
  const { conversation: conversation_id } = req.params;
  const { _id: user } = req.user;
  const { body } = req;

  const contact = await Contact.findOne({
    user,
    conversation_id,
  });

  const message = Message({
    ...body,
    sender: user,
    receiver: contact.partner,
    conversation_id,
  });
  message.save();
  console.log("contact", {
    ...body,
    sender: contact.user,
    receiver: contact.partner,
    conversation_id:  contact.conversation_id,
  });

  await Contact.updateMany({ conversation_id }, { lastMessage: message._id });

  res
    .status(200)
    .send({ success: true, conversation_id, message_id: message._id });
};
const retrieveMessages = async (req, res) => {
  const { conversation: conversation_id } = req.params;
  const conversation = await Message.find({ conversation_id })
    .populate("sender")
    .populate("receiver");

  return res.status(200).send({ conversation });
};

exports.sendText = sendText;
exports.retrieveMessages = retrieveMessages;

import React, { useState } from "react";
import { FaRegUserCircle, FaRegEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./App.css";
import sample from "./sample.json";

export default function ContactApp() {
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [mode, setMode] = useState("");
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState(sample);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.mobile.includes(search)
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile) {
      alert("Name and phone required");
      return;
    }

    if (mode === "add") {
      const newContact = {
        ...formData,
        id: Date.now(),
      };
      setContacts([...contacts, newContact]);
    }

    if (mode === "edit") {
      const updated = contacts.map((c) =>
        c.id === selectedContact.id ? { ...c, ...formData } : c
      );
      setContacts(updated);
    }

    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      address: "",
    });
  };

  return (
    <div className="container">
      <div className="app">
        <div className="header">
          All Contacts
          <span
            className="add"
            onClick={() => {
              setMode("add");
              resetForm();
              setSelectedContact(null);
              setShowModal(true);
            }}
          >
            ＋
          </span>
        </div>

        <input
          type="text"
          placeholder="Search Contact"
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="list">
          {filteredContacts.map((contact, index) => (
            <div className="card" key={contact.id}>
              <div className="left">
                <span className="index">{index + 1}</span>

                <div className="avatar">
                  <FaRegUserCircle />
                </div>

                <div>
                  <p className="name">{contact.name}</p>
                  <p className="phone">{contact.mobile}</p>
                </div>
              </div>

              <div className="actions">
                <span
                  onClick={() => {
                    setMode("view");
                    setSelectedContact(contact);
                    setFormData(contact);
                    setShowModal(true);
                  }}
                >
                  <FaRegEye />
                </span>

                <span onClick={() => handleDelete(contact.id)}>
                  <MdDelete />
                </span>

                <span
                  onClick={() => {
                    setMode("edit");
                    setSelectedContact(contact);
                    setFormData(contact);
                    setShowModal(true);
                  }}
                >
                  <MdEdit />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>
                {mode === "add" && "Add Contact"}
                {mode === "view" && "View Contact"}
                {mode === "edit" && "Edit Contact"}
              </h3>
              <span onClick={() => setShowModal(false)}>✖</span>
            </div>

            <div className="modal-body">
              <label>Name</label>
              <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={mode === "view"}
              />

              <label>Email</label>
              <input
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={mode === "view"}
              />

              <label>Phone</label>
              <input
                placeholder="Phone"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                disabled={mode === "view"}
              />

              <label>Address</label>
              <input
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                disabled={mode === "view"}
              />

              {mode !== "view" && (
                <div className="btns">
                  <button className="submit" onClick={handleSubmit}>
                    {mode === "edit" ? "Update" : "Submit"}
                  </button>

                  <button className="reset" onClick={resetForm}>
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
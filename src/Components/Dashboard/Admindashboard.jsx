import React, { useEffect, useState } from 'react';
import './Admindashboard.css';
import axios from 'axios';
import DOMPurify from 'dompurify';
import jsPDF from 'jspdf';

const Admindashboard = () => {
  const [names, setNames] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applied, setApplied] = useState([]);
  const [showWorkers, setShowWorkers] = useState(false);
  const [showEmployers, setShowEmployers] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showApplied, setShowApplied] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/auth/users/names'
        );
        setNames(response.data);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };

    fetchNames();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/auth/user2/usernames'
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/jobs/jobs/jobsPosted'
        );
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/apply/applies/JobsApplied'
        );
        setApplied(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchApplied();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`http://localhost:3000/${type}/${id}`);
      if (type === 'auth/users/names')
        setNames(names.filter((user) => user._id !== id));
      if (type === 'auth/user2/usernames')
        setUsers(users.filter((user) => user._id !== id));
      if (type === 'jobs/jobs/jobsPosted')
        setJobs(jobs.filter((job) => job._id !== id));
      if (type === 'apply/applies/JobsApplied')
        setApplied(applied.filter((apply) => apply._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item, type) => {
    setEditing({ ...item, type });
    setEditData(item);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:3000/${editing.type}/${editing._id}`,
        editData
      );
      if (editing.type === 'auth/users/names')
        setNames(
          names.map((user) => (user._id === editing._id ? editData : user))
        );
      if (editing.type === 'auth/user2/usernames')
        setUsers(
          users.map((user) => (user._id === editing._id ? editData : user))
        );
      if (editing.type === 'jobs/jobs/jobsPosted')
        setJobs(jobs.map((job) => (job._id === editing._id ? editData : job)));
      if (editing.type === 'apply/applies/JobsApplied')
        setApplied(
          applied.map((apply) => (apply._id === editing._id ? editData : apply))
        );
      setEditing(null);
    } catch (error) {
      console.error('Error saving edits:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setEditData({});
  };

  const handleWorkersClick = () => {
    setShowWorkers(!showWorkers);
    setShowEmployers(false);
    setShowJobs(false);
    setShowApplied(false);
  };

  const handleEmployersClick = () => {
    setShowEmployers(!showEmployers);
    setShowWorkers(false);
    setShowJobs(false);
    setShowApplied(false);
  };

  const handleJobsClick = () => {
    setShowJobs(!showJobs);
    setShowWorkers(false);
    setShowEmployers(false);
    setShowApplied(false);
  };

  const handleAppliedClick = () => {
    setShowApplied(!showApplied);
    setShowWorkers(false);
    setShowEmployers(false);
    setShowJobs(false);
  };
  const handleDownloadPDF = (type) => {
    const doc = new jsPDF();
    let title = '';
    let content = '';

    if (type === 'workers') {
      title = 'Workers List';
      content = names
        .map((user, index) => `${index + 1}. ${user.username}`)
        .join('\n');
    } else if (type === 'employers') {
      title = 'Employers List';
      content = users
        .map((user, index) => `${index + 1}. ${user.username}`)
        .join('\n');
    }

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(content, 10, 20);

    doc.save(`${type}.pdf`);
  };
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/Admin/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container">
      <div className="dashboard">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={handleEmployersClick} style={{ cursor: 'pointer' }}>
            Employers
            {showEmployers && (
              <i onClick={() => handleDownloadPDF('employers')}></i>
            )}
          </li>
          <li onClick={handleWorkersClick} style={{ cursor: 'pointer' }}>
            Workers
            {showWorkers && (
              <i onClick={() => handleDownloadPDF('workers')}></i>
            )}
          </li>
          <li onClick={handleJobsClick} style={{ cursor: 'pointer' }}>
            Jobs
          </li>
          <li onClick={handleAppliedClick} style={{ cursor: 'pointer' }}>
            Applications
          </li>
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
            <i
              className="fas fa-sign-out-alt logout-icon"
              style={{ transform: 'rotate(180deg)' }}
            ></i>
          </li>
        </ul>
      </div>
      <div
        className={`workers ${
          showWorkers || showEmployers || showJobs || showApplied ? 'show' : ''
        }`}
      >
        {showWorkers && (
          <>
            <h2>Workers List</h2>
            <i
              className="fas fa-download download-icon"
              onClick={() => handleDownloadPDF('workers')}
            ></i>
            <ul>
              {names.map((user, index) => (
                <li key={index}>
                  <div className="worker-item">
                    {editing &&
                    editing._id === user._id &&
                    editing.type === 'auth/users/names' ? (
                      <>
                        <input
                          type="text"
                          name="username"
                          value={editData.username}
                          onChange={handleEditChange}
                        />
                        <button onClick={handleEditSave}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <span>{user.username}</span>
                        <div className="icon-container">
                          <i
                            className="fas fa-edit edit-icon"
                            onClick={() => handleEdit(user, 'auth/users/names')}
                          ></i>
                          <i
                            className="fas fa-trash-alt delete-icon"
                            onClick={() =>
                              handleDelete(user._id, 'auth/users/names')
                            }
                          ></i>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {showEmployers && (
          <>
            <h2>Employers List</h2>
            <i
              className="fas fa-download download-icon"
              onClick={() => handleDownloadPDF('employers')}
            ></i>
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  <div className="worker-item">
                    {editing &&
                    editing._id === user._id &&
                    editing.type === 'auth/user2/usernames' ? (
                      <>
                        <input
                          type="text"
                          name="username"
                          value={editData.username}
                          onChange={handleEditChange}
                        />
                        <button onClick={handleEditSave}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <span>{user.username}</span>
                        <div className="icon-container">
                          <i
                            className="fas fa-edit edit-icon"
                            onClick={() =>
                              handleEdit(user, 'auth/user2/usernames')
                            }
                          ></i>
                          <i
                            className="fas fa-trash-alt delete-icon"
                            onClick={() =>
                              handleDelete(user._id, 'auth/user2/usernames')
                            }
                          ></i>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {showJobs && (
          <>
            <h2>Jobs List</h2>
            <ul>
              {jobs.map((job, index) => (
                <li key={index}>
                  <div className="worker-item">
                    {editing &&
                    editing._id === job._id &&
                    editing.type === 'jobs/jobs/jobsPosted' ? (
                      <>
                        <input
                          type="text"
                          name="title"
                          value={editData.title}
                          onChange={handleEditChange}
                        />
                        <input
                          type="text"
                          name="location"
                          value={editData.location}
                          onChange={handleEditChange}
                        />
                        <textarea
                          name="description"
                          value={editData.description}
                          onChange={handleEditChange}
                        />
                        <button onClick={handleEditSave}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <span className="item-detail">
                          <b>Title:</b> {job.title}
                        </span>
                        <span className="item-detail">
                          <b>Location:</b> {job.location}
                        </span>
                        <span className="item-detail">
                          <b>code:</b> {job.code}
                        </span>
                        <span className="item-detail">
                          <b>Description:</b>{' '}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(job.description),
                            }}
                          />
                        </span>
                        <div className="icon-container">
                          <i
                            className="fas fa-edit edit-icon"
                            onClick={() =>
                              handleEdit(job, 'jobs/jobs/jobsPosted')
                            }
                          ></i>
                          <i
                            className="fas fa-trash-alt delete-icon"
                            onClick={() =>
                              handleDelete(job._id, 'jobs/jobs/jobsPosted')
                            }
                          ></i>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {showApplied && (
          <>
            <h2>Applications List</h2>
            <ul>
              {applied.map((application, index) => (
                <li key={index}>
                  <div className="worker-item">
                    {editing &&
                    editing._id === application._id &&
                    editing.type === 'apply/applies/JobsApplied' ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                        />
                        <input
                          type="text"
                          name="email"
                          value={editData.email}
                          onChange={handleEditChange}
                        />
                        <input
                          type="text"
                          name="phone"
                          value={editData.phone}
                          onChange={handleEditChange}
                        />
                        <input
                          type="text"
                          name="location"
                          value={editData.location}
                          onChange={handleEditChange}
                        />
                        <button onClick={handleEditSave}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <span className="item-detail">
                          <b>Name:</b> {application.name}
                        </span>
                        <span className="item-detail">
                          <b>Email:</b> {application.email}
                        </span>
                        <span className="item-detail">
                          <b>Phone:</b> {application.phone}
                        </span>
                        <span className="item-detail">
                          <b>Location:</b> {application.location}
                        </span>
                        <span className="item-detail">
                          <b>code:</b> {application.code}
                        </span>
                        <div className="icon-container">
                          <i
                            className="fas fa-edit edit-icon"
                            onClick={() =>
                              handleEdit(
                                application,
                                'apply/applies/JobsApplied'
                              )
                            }
                          ></i>
                          <i
                            className="fas fa-trash-alt delete-icon"
                            onClick={() =>
                              handleDelete(
                                application._id,
                                'apply/applies/JobsApplied'
                              )
                            }
                          ></i>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Admindashboard;

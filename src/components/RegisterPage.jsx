import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [role, setRole] = useState('candidate'); // або 'employer'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    qualification: '',
    specialization: '',
    otherDetails: '',
    name: '',
    activityType: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      qualification: '',
      specialization: '',
      otherDetails: '',
      name: '',
      activityType: '',
      address: '',
      phone: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Створюємо об'єкт даних для відправки в залежності від ролі
    const userData = role === 'employer' ? {
      name: formData.name,
      activityType: formData.activityType,
      address: formData.address,
      phone: formData.phone,
      password: formData.password,
      username: formData.username,
      role: role,
    } : {
      firstName: formData.firstName,
      lastName: formData.lastName,
      qualification: formData.qualification,
      specialization: formData.specialization,
      otherDetails: formData.otherDetails,
      password: formData.password,
      username: formData.username,
      role: role,
    };

    dispatch(registerUser(userData));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
            Role:
          </label>
          <select
            value={role}
            onChange={handleRoleChange}
            style={{
              padding: '10px',
              width: '100%',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              marginBottom: '20px',
            }}
            required
          >
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                padding: '10px',
                width: '100%',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                padding: '10px',
                width: '100%',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
              required
            />
          </div>

          {role === 'candidate' && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Qualification:
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Specialization:
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Other Details:
                </label>
                <input
                  type="text"
                  name="otherDetails"
                  value={formData.otherDetails}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>
            </>
          )}

          {role === 'employer' && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Company Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Activity Type:
                </label>
                <input
                  type="text"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Address:
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Phone:
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '16px',
              marginTop: '20px',
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

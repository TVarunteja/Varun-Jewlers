import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TakenAway.css'; // Import your CSS file
import config from '../Config';

const TakenAway = () => {
  const [deletedCustomers, setDeletedCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDeletedCustomers = async () => {
      try {
        const response = await axios.get(`${config.url}/viewcustomer`);
        const customersWithFormattedDate = response.data.map(customer => ({
          ...customer,
          date: new Date(customer.date).toLocaleDateString('en-GB')
        }));
        setDeletedCustomers(customersWithFormattedDate); // Set formatted data
        
      } catch (error) {
        console.error('Error fetching deleted customers:', error);
      }
    };

    fetchDeletedCustomers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = deletedCustomers.filter(customer =>
    customer.billnumber.toString().includes(searchTerm)
  );

  return (
    <div>
      <h1>Deleted Customers</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Bill Number..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '5px', marginRight: '10px' }}
        />
      </div>
      {filteredCustomers && filteredCustomers.length > 0 ? (
        <table className="customers-table"> {/* Ensure this class matches your CSS */}
          <thead>
            <tr>
              <th>Taken Away Date</th>
              <th>Bill Number</th>
              <th>Name</th>
              <th>Father Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Item Type</th>
              <th>Amount</th>
              <th>There At</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.date}</td>
                <td>{customer.billnumber}</td>
                <td>{customer.name}</td>
                <td>{customer.fathername}</td>
                <td>{customer.address}</td>
                <td>{customer.phonenumber}</td>
                <td>{customer.itemtype}</td>
                <td>{customer.amount}</td>
                <td>{customer.thereat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No deleted customers</p>
      )}
    </div>
  );
};

export default TakenAway;

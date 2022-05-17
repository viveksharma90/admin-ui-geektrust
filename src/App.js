import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';

import Dashboard from './components/Dashboard';
import axios from 'axios';
import config from './config';

function App() {
  const [error, setError] = useState({});
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    dataApiCall();
  }, []);

  const dataApiCall = async () => {
    let responseReceived;
    try {
      responseReceived = await axios.get(config.BASE_URL);
      responseReceived.data = responseReceived.data.map((el) => ({
        ...el,
        visible: true,
        deleted: false,
        checked: false,
        edit: false,
      }));
      setUserDetails(responseReceived.data);
    } catch (error) {
      setError({ message: error.message });
    }
  };

  const onSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const nData = [...userDetails];
    const nUserDetails = nData.map((data) => {
      if (
        data.name.toLowerCase().includes(searchText) ||
        data.role.toLowerCase().includes(searchText) ||
        data.email.toLowerCase().includes(searchText)
      ) {
        return { ...data, visible: true };
      } else {
        return { ...data, visible: false };
      }
    });
    setUserDetails(nUserDetails);
  };

  const handleDelete = (id) => {
    const nData = [...userDetails];
    const nUserDetails = nData.map((data) => {
      if (data.id === id) {
        return { ...data, deleted: true };
      }
      return data;
    });
    setUserDetails(nUserDetails);
  };

  const handleBunchDelete = (items) => {
    console.log(items);
    const nUserDetails = [...userDetails];
    nUserDetails.forEach((userDetail) => {
      items.forEach((item) => {
        if (item.id === userDetail.id && item.checked) {
          userDetail.deleted = true;
        }
      });
    });
    setUserDetails(nUserDetails);
  };

  const handleSelect = (event, user) => {
    const curr = event.target;
    const nUserDetails = [...userDetails];
    const userIdx = nUserDetails.indexOf(user);
    if (curr.checked) {
      nUserDetails[userIdx].checked = true;
    } else {
      nUserDetails[userIdx].checked = false;
    }
    setUserDetails(nUserDetails);
  };
  const handleSelectAll = (event, items) => {
    const curr = event.target;
    const nUserDetails = [...userDetails];
    if (curr.checked) {
      nUserDetails.forEach((userDetail) => {
        items.forEach((item) => {
          if (item.id === userDetail.id) {
            userDetail.checked = true;
          }
        });
      });
    } else {
      nUserDetails.forEach((userDetail) => {
        items.forEach((item) => {
          if (item.id === userDetail.id) {
            userDetail.checked = false;
          }
        });
      });
    }
    setUserDetails(nUserDetails);
  };

  const handleEdit = (user) => {
    const nUserDetails = [...userDetails];
    const userIdx = nUserDetails.indexOf(user);
    nUserDetails[userIdx].edit = true;
    setUserDetails(nUserDetails);
  };

  const handleValueEdit = (user, editedValues) => {
    const nUserDetails = [...userDetails];
    const userIdx = nUserDetails.indexOf(user);
    if (editedValues['name']) {
      nUserDetails[userIdx].name = editedValues.name;
    }
    if (editedValues['email']) {
      nUserDetails[userIdx].email = editedValues.email;
    }
    if (editedValues['role']) {
      nUserDetails[userIdx].role = editedValues.role;
    }
    nUserDetails[userIdx].edit = false;
    setUserDetails(nUserDetails);
  };

  return (
    <div className="App">
      {error.message && <h1>{error.message}</h1>}
      {userDetails.length !== 0 && (
        <Dashboard
          userDetails={userDetails}
          rowLimit={config.ROW_LIMIT}
          onDelete={handleDelete}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onBunchDelete={handleBunchDelete}
          onEdit={handleEdit}
          onEditValues={handleValueEdit}
          onSearch={onSearch}
        />
      )}
    </div>
  );
}

export default App;

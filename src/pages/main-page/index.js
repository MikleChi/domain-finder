import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import styles from './main-page.module.css';
import DomainInfo from '../../components/domain-info';

const MainPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const fetchDataAboutDomains = async (value) => {
    try {
      const { data } = await axios.get(`http://api.domainsdb.info/v1/domains/search?limit=50&domain=${value}`);
      const valuesForSelect = data?.domains?.map((domain) => ({ value: { ...domain }, label: domain.domain }));
      return valuesForSelect;
    } catch (e) {
      console.error(e);
    }
  };

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      return callback(null, { options: [] });
    }
    if (!(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(inputValue))) {
      setError(true);
      return callback(null, { options: [] });
    }
    setError(false);
    fetchDataAboutDomains(inputValue).then((domainsArray) => callback(domainsArray));
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue.value);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Domain Name Finder</h1>
      <h3>Please, enter your desired domain</h3>
      {error && (
      <p className={styles.errorText}>
        Please enter valid domain in this format
        <b> domainname.tld</b>
      </p>
      )}
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleInputChange}
      />
      {inputValue && (<DomainInfo domain={inputValue} />)}
    </div>
  );
};

export default MainPage;

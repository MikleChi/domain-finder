import React from 'react';
import styles from './domain-info.module.css';

const DomainInfo = ({ domain }) => (
  <div className={styles.domain}>
    <h4>Full Information about domain:</h4>
    <p>{`A: ${domain?.A?.join() || 'none'}`}</p>
    <p>{`CNAME: ${domain?.CNAME?.join() || 'none'}`}</p>
    <p>{`MX: ${domain?.MX?.[0]?.exchange || 'none'}`}</p>
    <p>{`NS: ${domain?.CNAME?.join() || 'none'}`}</p>
    <p>{`TXT: ${domain?.TXT?.join() || 'none'}`}</p>
    <p>{`Country: ${domain?.country || 'none'}`}</p>
    <p>{`Is domain dead: ${domain?.isDead}`}</p>
    <p>{`Date Created: ${domain?.create_date || 'none'}`}</p>
    <p>{`Date Created: ${domain?.update_date || 'none'}`}</p>
  </div>
);

export default DomainInfo;

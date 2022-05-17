import { ActionButtons, Search, Table } from '../UtilitiesItems';
import { useEffect, useState } from 'react';

import config from '../../config';
import styles from './Dashboard.module.css';

const Dashboard = ({
  userDetails,
  rowLimit,
  onDelete,
  onSelect,
  onSelectAll,
  onBunchDelete,
  onEdit,
  onEditValues,
  onSearch,
}) => {
  const [noOfPages, setNoOfPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  useEffect(() => {
    let detailSize = userDetails.reduce((total, user) => {
      if (user.visible && !user.deleted) {
        return (total += 1);
      }
      return total;
    }, 0);
    let calcPages = Math.ceil(detailSize / rowLimit);
    setNoOfPages(calcPages);
    if (calcPages <= config.PAGE_LIMIT) {
      if (calcPages <= 0) calcPages = 1;
      setPageLimit(calcPages);
      return;
    }
    setPageLimit(config.PAGE_LIMIT);
  }, [rowLimit, userDetails]);

  const getToFirstPage = () => {
    setCurrentPageIndex(1);
  };
  const getToLastPage = () => {
    setCurrentPageIndex(noOfPages);
  };
  const getToNextPage = () => {
    setCurrentPageIndex((current) => current + 1);
  };
  const getToPreviousPage = () => {
    setCurrentPageIndex((current) => current - 1);
  };
  const moveToPage = (event) => {
    event.preventDefault();
    setCurrentPageIndex(Number(event.target.innerText));
  };

  const getItemsPerPage = () => {
    let nData = userDetails.filter((user) => user.visible && !user.deleted);
    const startIndex = currentPageIndex * rowLimit - rowLimit;
    return nData.splice(startIndex, rowLimit);
  };

  const getSelectedCount = () => {
    const usersVisible = getItemsPerPage();
    let flag = usersVisible.every((user) => !user.checked);
    return flag;
  };

  const getAllSelectedFlag = () => {
    const usersVisible = getItemsPerPage();
    let flag = usersVisible.every((user) => user.checked);
    return flag;
  };

  const getPaginationCluster = () => {
    let startingValue =
      Math.floor((currentPageIndex - 1) / pageLimit) * pageLimit;
    const paginationCluster = [];

    for (let idx = 0; idx < pageLimit; idx++) {
      let value = idx + startingValue + 1;
      paginationCluster.push(value);
    }

    if (paginationCluster.at(0) > noOfPages) {
      if (startingValue <= 0) {
        return paginationCluster;
      }
      setCurrentPageIndex(startingValue);
    }

    return paginationCluster;
  };

  return (
    <div className={styles.dashboardContainer}>
      <Search
        placeholder="Search by name, email or role"
        onChange={onSearch}
      />

      <Table
        getAllSelectedFlag={getAllSelectedFlag}
        onSelectAll={onSelectAll}
        getItemsPerPage={getItemsPerPage}
        onSelect={onSelect}
        onEdit={onEdit}
        onDelete={onDelete}
        onEditValues={onEditValues}
      />

      <ActionButtons
        currentPageIndex={currentPageIndex}
        noOfPages={noOfPages}
        getToFirstPage={getToFirstPage}
        getToPreviousPage={getToPreviousPage}
        moveToPage={moveToPage}
        getToNextPage={getToNextPage}
        getToLastPage={getToLastPage}
        getSelectedCount={getSelectedCount}
        getPaginationCluster={getPaginationCluster}
        onBunchDelete={onBunchDelete.bind(null, getItemsPerPage())}
      />
    </div>
  );
};

export default Dashboard;

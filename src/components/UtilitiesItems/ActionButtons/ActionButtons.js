import { CircularButton } from '../../CircularItems';
import styles from './ActionButtons.module.css';

const ActionButtons = ({
  currentPageIndex,
  noOfPages,
  getToFirstPage,
  getToPreviousPage,
  moveToPage,
  getToNextPage,
  getToLastPage,
  getSelectedCount,
  getPaginationCluster,
  onBunchDelete,
}) => {
  return (
    <div className={styles.actionBtn}>
      <button
        className={styles.actionBtn__delete}
        disabled={getSelectedCount()}
        onClick={onBunchDelete}
      >
        <span>Delete Selected</span>
      </button>
      <CircularButton
        content={`${String.fromCharCode(60)}${String.fromCharCode(60)}`}
        isDisabled={currentPageIndex === 1 ? true : false}
        isSelected={false}
        onClick={getToFirstPage}
      />
      <CircularButton
        content={String.fromCharCode(60)}
        isDisabled={currentPageIndex === 1 ? true : false}
        isSelected={false}
        onClick={getToPreviousPage}
      />
      {getPaginationCluster().map((item, idx) => (
        <CircularButton
          key={idx}
          content={item}
          isDisabled={false}
          isSelected={currentPageIndex === idx + 1 ? true : false}
          onClick={moveToPage}
        />
      ))}
      <CircularButton
        content={String.fromCharCode(62)}
        isDisabled={
          currentPageIndex === noOfPages || noOfPages === 0
            ? true
            : false
        }
        isSelected={false}
        onClick={getToNextPage}
      />
      <CircularButton
        content={`${String.fromCharCode(62)}${String.fromCharCode(62)}`}
        isDisabled={
          currentPageIndex === noOfPages || noOfPages === 0
            ? true
            : false
        }
        isSelected={false}
        onClick={getToLastPage}
      />
    </div>
  );
};

export default ActionButtons;

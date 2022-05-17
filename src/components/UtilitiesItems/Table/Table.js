import { TableHeading, User } from '../index';

import { useState } from 'react';

const Table = ({
    getAllSelectedFlag,
    onSelectAll,
    getItemsPerPage,
    onSelect,
    onEdit,
    onDelete,
    onEditValues,
}) => {
    const [editedUserValues, setEditedUserValues] = useState({});
    const handleUserEditing = (event) => {
        setEditedUserValues({
            ...editedUserValues,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <table>
            <TableHeading
                getAllSelectedFlag={getAllSelectedFlag}
                onSelectAll={onSelectAll}
                getItemsPerPage={getItemsPerPage}
            />
            <tbody>
                {getItemsPerPage().map((items, idx) => (
                    <User
                        key={idx}
                        user={items}
                        onSelect={onSelect}
                        handleEdit={handleUserEditing}
                        onEditClick={onEdit.bind(null, items)}
                        onDeleteClick={onDelete.bind(null, items.id)}
                        onConfirmEdit={onEditValues.bind(
                            null,
                            items,
                            editedUserValues
                        )}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default Table;

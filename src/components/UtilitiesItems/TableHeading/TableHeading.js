const TableHeading = ({ getAllSelectedFlag, onSelectAll, getItemsPerPage }) => {
    return (
        <thead>
            <tr>
                <th>
                    <input
                        type="checkbox"
                        name="selectAll"
                        checked={getAllSelectedFlag()}
                        style={{
                            cursor: 'pointer',
                        }}
                        onChange={(event) => {
                            onSelectAll(event, getItemsPerPage());
                        }}
                    />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
    );
};

export default TableHeading;

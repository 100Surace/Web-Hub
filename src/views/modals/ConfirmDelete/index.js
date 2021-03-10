import WarningIcon from '@material-ui/icons/WarningRounded';
import './styles.css';

const ConfirmDelete = ({ confirmDelete, setConfirmDeleteModal }) => (
  <div className="modal">
    <div className="modal-wrapper">
      <div className="heading">
        <WarningIcon />
        <div>
          <h4>Confirm Delete?</h4>
          <p>This action cannot be undone.</p>
        </div>
      </div>
      <section>
        <button
          onClick={() => setConfirmDeleteModal(false)}
          className="btn-cancel"
        >
          Cancel
        </button>
        <button onClick={confirmDelete} className="btn-delete">
          Delete
        </button>
      </section>
    </div>
  </div>
);

export default ConfirmDelete;

import PropTypes from 'prop-types';
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
          type="button"
          onClick={() => setConfirmDeleteModal(false)}
          className="btn-cancel"
        >
          Cancel
        </button>
        <button type="button" onClick={confirmDelete} className="btn-delete">
          Delete
        </button>
      </section>
    </div>
  </div>
);

ConfirmDelete.propTypes = {
  confirmDelete: PropTypes.func,
  setConfirmDeleteModal: PropTypes.func
};

export default ConfirmDelete;

import Modal from 'react-modal';

const MapIntro = ({ content, cta, onClose = () => {} }) => (
  <Modal>
    {content}

    <button
      type="text"
      onClick={(event) => {
        event.preventDefault();
        onClose();
      }}>
      {cta}
    </button>
  </Modal>
);

export default MapIntro;

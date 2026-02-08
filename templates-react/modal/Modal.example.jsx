import React, { useState } from 'react';
import Modal from './Modal';

/**
 * Example usage of Modal component
 */
const ModalExample = () => {
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isMediumOpen, setIsMediumOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '30px' }}>Modal Component Examples</h2>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setIsSmallOpen(true)}
          style={{ padding: '12px 24px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Open Small Modal
        </button>
        
        <button 
          onClick={() => setIsMediumOpen(true)}
          style={{ padding: '12px 24px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Open Medium Modal
        </button>
        
        <button 
          onClick={() => setIsLargeOpen(true)}
          style={{ padding: '12px 24px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Open Large Modal
        </button>
      </div>

      <Modal
        isOpen={isSmallOpen}
        onClose={() => setIsSmallOpen(false)}
        title="Small Modal"
        size="small"
        footer={
          <>
            <button 
              onClick={() => setIsSmallOpen(false)}
              style={{ padding: '10px 20px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button 
              onClick={() => { console.log('Confirmed!'); setIsSmallOpen(false); }}
              style={{ padding: '10px 20px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Confirm
            </button>
          </>
        }
      >
        <p>This is a small modal perfect for confirmation dialogs or short messages.</p>
      </Modal>

      <Modal
        isOpen={isMediumOpen}
        onClose={() => setIsMediumOpen(false)}
        title="Medium Modal"
        size="medium"
      >
        <h3>Modal Content</h3>
        <p>This is a medium-sized modal suitable for forms or detailed information.</p>
        <p>You can include any React components or HTML elements inside the modal.</p>
      </Modal>

      <Modal
        isOpen={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        title="Large Modal"
        size="large"
      >
        <h3>Large Modal Content</h3>
        <p>This is a large modal ideal for complex interfaces or detailed content.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </Modal>
    </div>
  );
};

export default ModalExample;

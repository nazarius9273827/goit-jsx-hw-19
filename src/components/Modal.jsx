import { useRef, useEffect } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside.jsx';

export default function Modal({ image, onClose }) {
  const modalRef = useRef();

  useOnClickOutside(modalRef, onClose);

  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="overlay">
      <div className="modal" ref={modalRef}>
        <img src={image} alt="" />
      </div>
    </div>
  );
}

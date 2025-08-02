export default function PaymentQRModal({ onClose, totalAmount })  {
  return (
      <div className="modal-overlay">
          <div className="modal-content">
              <h2>Scan QR to Pay with MoMo</h2>
              <img
                  src="https://img.vietqr.io/image/970422-123456789-compact.jpg" // ← Fake QR or custom image
                  alt="MoMo QR Code"
                  style={{ width: '300px', margin: '20px 0' }}
              />
              <p><strong>Amount:</strong> {totalAmount.toLocaleString()} VND</p>
              <button onClick={onClose}>Xac nhan da thanh toan</button>
          </div>
      </div>
  );
};



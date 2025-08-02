
export default function UserEditForm ({ form, onChange, onSubmit, isUpdating }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="tenDangNhap"
        value={form.tenDangNhap}
        onChange={onChange}
        placeholder="Họ tên"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="soDienThoai"
        value={form.soDienThoai}
        onChange={onChange}
        placeholder="Số điện thoại"
      />
      <input
        type="text"
        name="diaChi"
        value={form.diaChi}
        onChange={onChange}
        placeholder="Địa chỉ"
      />
      <button
        type="submit"
        disabled={isUpdating}
      >
        {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </form>
  );
};




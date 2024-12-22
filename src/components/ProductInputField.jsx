const ProductInputField = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled,
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder={placeholder}
    disabled={disabled}
  />
);

export default ProductInputField;

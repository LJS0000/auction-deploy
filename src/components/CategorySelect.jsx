const CategorySelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="" disabled hidden>
      카테고리
    </option>
    <option value="apparel">의류</option>
    <option value="electronic">전자제품</option>
    <option value="furniture">가구</option>
    <option value="kid">아동상품</option>
    <option value="beauty">뷰티/미용</option>
    <option value="hobby">취미생활</option>
    <option value="food">식품</option>
    <option value="etc">기타</option>
  </select>
);

export default CategorySelect;

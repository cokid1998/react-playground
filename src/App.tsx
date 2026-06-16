import { useEffect, useState } from "react";

interface CategoriesResponse {
  id: number;
  name: string;
}

interface ServerPayload {
  title: string;
  categoryId: number;
  price: number;
  isPublished: "Y" | "N";
}

interface UIState {
  title: string;
  // 두번째 문제
  // 기획에서 select의 첫번째 option태그는 "선택안함"을 보여줘야함
  // categories 타입에 null이 추가 됨
  categories: CategoriesResponse | null;
  price: number;
  isPublished: boolean;
}

function App() {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [form, setForm] = useState<UIState | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3001/categories");
      const categoriesData: CategoriesResponse[] = await res.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  return (
    <form className="flex flex-col w-50">
      <input className="border" value={form?.title} />
      <select className="border">
        <option value={""}>선택 안함</option>
        {categories?.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input className="border" type="number" />
      <input type="radio" />
    </form>
  );
}

export default App;

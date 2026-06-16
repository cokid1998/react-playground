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
  // 첫번째 고민.. front에서는 label과 value라는 프로퍼티로 넣고싶은데 서버에서는
  // id랑 name이라는 이름으로 들어옴
  // categories: CategoriesResponse;

  // 해결볍 1
  // categories: {
  //   label: string;
  //   value: number;
  // };

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
      /*
        해결법 2
        const formmatedCategories = categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }));
        setCategories(formmatedCategories);
       */
    };
    fetchCategories();
  }, []);

  return (
    <form className="flex flex-col w-50">
      <input className="border" value={form?.title} />
      <select className="border">
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

// 첫번째 고민.. UIState타입에서는 label과 value라는 프로퍼티로 넣고싶은데 서버에서는 id랑 name이라는 이름으로 들어옴
// 해결법 1. 그냥 UIState의 label과 value는 id와 name으로 바꿈
// 해결법 2. 가져올 때 가공해서 가져옴 ✅

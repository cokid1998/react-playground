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
  /*
    기획요구사항: select의 첫번째 option태그는 "코스 선택"을 보여줘야함
    categories 타입에 null이 추가 됨
  */
  categories: CategoriesResponse | null;
  /**
   * 기획 요구사항: price는 콤마를 찍어야하며, 초기값은 0이아니라 빈문자열이여야한다.
   * 그렇기 때문에 price는 number에서 string으로 바꿔야하는 상황이 됨
   */
  price: string;
  isPublished: boolean;
}

function App() {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [form, setForm] = useState<UIState>({
    title: "",
    categories: null,
    price: "",
    isPublished: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3001/categories");
      const categoriesData: CategoriesResponse[] = await res.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;

    /**
     * price에 콤마를 찍어야하는 요구사항 때문에 점점 변환로직이 파편화 되고있음
     */
    if (id === "price") {
      const numeric = value.replace(/[^0-9]/g, "");
      setForm((prev) => ({
        ...prev,
        price: numeric === "" ? "" : Number(numeric).toLocaleString(),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === "") {
      setForm((prev) => ({ ...prev, categories: null }));
      return;
    }

    const selectedCategory =
      /* DOM에서 가져오는 value는 string이기 때문에 number로 변환해줘야함 */
      categories.find((cat) => cat.id === Number(value)) ?? null;

    setForm((prev) => ({
      ...prev,
      categories: selectedCategory,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    if (!form.categories) {
      alert("카테고리를 선택해주세요");
      return;
    }

    const payload: ServerPayload = {
      title: form.title,
      categoryId: form.categories.id,
      // price에 넣어준 콤마를 제거하는 코드
      price: Number(form.price.replace(/,/g, "")),
      isPublished: form.isPublished ? "Y" : "N",
    };

    const postData = async () => {
      const res = await fetch("http://localhost:3001/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(res);
    };
    postData();
  };

  return (
    <div className="flex flex-col gap-10">
      <form className="flex flex-col w-50" onSubmit={onSubmit}>
        <input
          className="border"
          id={"title"}
          value={form?.title}
          onChange={handleInputChange}
        />
        <select
          id="categories"
          className="border"
          onChange={handleSelectChange}
          value={form.categories?.id}
        >
          {/*
            option의 value에 UIState의 categories타입의 유니온 타입인 null을 넣고싶은데 value에 null을 넣을 수 없음
            그래서 빈 문자열을 넣어야함
          */}
          <option value={""}>코스 선택</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          className="border"
          id="price"
          type="text"
          onChange={handleInputChange}
          value={form.price}
        />
        <input
          type="checkbox"
          id="isPublished"
          onChange={handleInputChange}
          checked={form.isPublished}
        />
        <button className="border" type="submit">
          제출
        </button>
      </form>

      <div className="border w-50">
        <div>이름: {form.title}</div>
        {/* 이 UI때문에 form 상태의 카테고리를 객체로 value와 name을 가지는 객체로 만들 수 밖에 없음  */}
        <div>선택한 카테고리: {form.categories?.name}</div>
        <div>가격: {form.price}</div>
        <div>isPublished: {form.isPublished + ""}</div>
      </div>
    </div>
  );
}

export default App;

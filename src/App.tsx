import { useEffect, useState } from "react";
import { z } from "zod";

interface CategoriesResponse {
  id: number;
  name: string;
}

// interface ServerPayload {
//   title: string;
//   categoryId: number;
//   price: number;
//   isPublished: "Y" | "N";
// }

// interface Form {
//   title: string;
//   categories: CategoriesResponse | null;
//   price: string;
//   isPublished: boolean;
// }

// zod를 쓰면 데이터 변환과 타입정의를 한번에 할 수 있음
const formSchema = z
  .object({
    title: z.string(),
    categories: z.object({ id: z.number(), name: z.string() }).nullable(),
    price: z.string(),
    isPublished: z.boolean(),
  })
  .transform((form) => ({
    title: form.title,
    categoryId: form.categories?.id,
    price: Number(form.price.replace(/,/g, "")),
    isPublished: form.isPublished ? "Y" : "N",
  }));

type Form = z.input<typeof formSchema>;
type ServerPayload = z.output<typeof formSchema>;

function App() {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [form, setForm] = useState<Form>({
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
    // 2. UI, 서버 타입 분리로 인해 작성해야하는 변환로직 이슈
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
      // 1. UI와 서버 타입을 분리했을 때 나타나는 이슈
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

    // zod는 검증, 변환, 타입선언을 zod의 schema기능을 통해 하나로 묶어줌
    const { data: payload, success } = formSchema.safeParse(form);

    // const payload: ServerPayload = {
    //   title: form.title,
    //   categoryId: form.categories.id,
    //   // price에 넣어준 콤마를 제거하는 코드
    //   // 2. UI, 서버 타입 분리로 인해 작성해야하는 변환로직 이슈
    //   price: Number(form.price.replace(/,/g, "")),
    //   // 변환로직
    //   // 2. UI, 서버 타입 분리로 인해 작성해야하는 변환로직 이슈
    //   isPublished: form.isPublished ? "Y" : "N",
    // };

    console.log(payload, success);

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
          value={form.title}
          onChange={handleInputChange}
        />
        <select
          id="categories"
          className="border"
          onChange={handleSelectChange}
          // null을 DOM에 넣을 수 없어서 ""으로 변환하는 코드
          value={form.categories?.id ?? ""}
        >
          {/*
            option의 value에 UIState의 categories타입의 유니온 타입인 null을 넣고싶은데 value에 null을 넣을 수 없음
            그래서 빈 문자열을 넣어야함
            // 1. UI와 서버 타입을 분리했을 때 나타나는 이슈
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
        {/*
          이 UI때문에 form 상태의 카테고리를 객체로 value와 name을 가지는 객체로 만들 수 밖에 없음 
          UI와 서버 타입을 분리했을 때 나타나는 이슈
         */}
        <div>선택한 카테고리: {form.categories?.name}</div>
        <div>가격: {form.price}</div>
        <div>isPublished: {form.isPublished + ""}</div>
      </div>
    </div>
  );
}

export default App;

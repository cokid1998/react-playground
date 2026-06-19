import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CategoriesResponse {
  id: number;
  name: string;
}

// zod 스키마: 검증 + 변환 + 타입선언을 한번에 처리
const formSchema = z
  .object({
    title: z.string().min(1, "강의 제목은 필수입니다."),
    categories: z.object({ id: z.number(), name: z.string() }).nullable(),
    price: z.string(),
    isPublished: z.boolean(),
  })
  .refine((form) => form.categories !== null, {
    message: "카테고리를 선택해주세요",
    path: ["categories"],
  })
  .transform((form) => ({
    title: form.title,
    categoryId: form.categories!.id,
    price: Number(form.price.replace(/,/g, "")),
    isPublished: form.isPublished ? "Y" : "N",
  }));

type FormInput = z.input<typeof formSchema>; // UI에서 다루는 타입
type ServerPayload = z.output<typeof formSchema>; // 서버로 보내는 타입

function App() {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput, unknown, ServerPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categories: null,
      price: "",
      isPublished: false,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3001/categories");
      const categoriesData: CategoriesResponse[] = await res.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  // onSubmit에 들어오는 data는 이미 검증 + 변환이 끝난 ServerPayload 타입
  const onSubmit = async (data: ServerPayload) => {
    const res = await fetch("http://localhost:3001/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);
  };

  return (
    <div className="flex flex-col gap-10">
      <form className="flex flex-col w-50" onSubmit={handleSubmit(onSubmit)}>
        <input className="border" {...register("title")} />
        {errors.title && <span>{errors.title.message}</span>}

        {/* select처럼 객체를 다뤄야 하는 필드는 register만으로 부족해서 Controller를 사용 */}
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <select
              className="border"
              value={field.value?.id ?? ""}
              onChange={(e) => {
                const selected =
                  categories.find((cat) => cat.id === Number(e.target.value)) ??
                  null;
                field.onChange(selected);
              }}
            >
              <option value="">코스 선택</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.categories && <span>{errors.categories.message}</span>}

        {/* price도 입력 즉시 콤마 포맷팅이 필요해서 Controller로 onChange를 직접 제어 */}
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <input
              className="border"
              type="text"
              value={field.value}
              onChange={(e) => {
                const numeric = e.target.value.replace(/[^0-9]/g, "");
                field.onChange(
                  numeric === "" ? "" : Number(numeric).toLocaleString(),
                );
              }}
            />
          )}
        />

        <input type="checkbox" {...register("isPublished")} />

        <button className="border" type="submit">
          제출
        </button>
      </form>
    </div>
  );
}

export default App;

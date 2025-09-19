"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchUserById } from "../../../store/slices/usersSlice";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
  if (!user) return <p>Пользователь не найден</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Детали пользователя</h1>
      <img
        src={`https://i.pravatar.cc/150?img=${user.id}`}
        alt={user.name}
        width={120}
        height={120}
        style={{ borderRadius: "50%", marginBottom: "20px" }}
      />
      <h2>{user.name}</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Телефон:</b> {user.phone}</p>
      <p><b>Сайт:</b> {user.website}</p>
      <p><b>Компания:</b> {user.company?.name}</p>
      <p><b>Адрес:</b> {user.address?.city}, {user.address?.street}</p>

      <button
        onClick={() => router.push("/users")}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        ← Назад к списку
      </button>
    </div>
  );
}

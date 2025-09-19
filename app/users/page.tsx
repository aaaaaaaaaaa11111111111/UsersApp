"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchUsers } from "../../store/slices/usersSlice";
import Link from "next/link";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.users);

  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const startIndex = (page - 1) * usersPerPage;
  const paginatedUsers = list.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(list.length / usersPerPage);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Список пользователей</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {paginatedUsers.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              gap: "15px",
            }}
          >
            <img
              src={`https://i.pravatar.cc/50?img=${user.id}`}
              alt={user.name}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <Link href={`/users/${user.id}`}>
                <strong>{user.name}</strong>
              </Link>
              <p style={{ margin: 0 }}>{user.email}</p>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            style={{
              marginRight: "5px",
              padding: "5px 10px",
              background: page === i + 1 ? "blue" : "lightgray",
              color: page === i + 1 ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

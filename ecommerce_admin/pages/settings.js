import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    try {
      const response = await axios.get("/api/admins");
      setAdmins(response.data.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  }

  async function addAdmin() {
    try {
      await axios.post("/api/admins", { email: newAdminEmail });
      setNewAdminEmail("");
      fetchAdmins();
      alert("Новий адміністратор доданий успішно.");
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Помилка під час додавання адміністратора.");
    }
  }

  async function deleteAdmin(email) {
    try {
      await axios.delete(`/api/admins/${email}`);
      fetchAdmins();
      alert("Адміністратор видалений успішно.");
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Помилка під час видалення адміністратора.");
    }
  }

  return (
    <Layout>
      <h1>Налаштування</h1>
      <h2>Список адміністраторів</h2>
      <ul>
        {admins.map((admin, index) => (
          <li key={index}>
            {admin.email}{" "}
            <button onClick={() => deleteAdmin(admin.email)}>Видалити</button>
          </li>
        ))}
      </ul>
      <h2>Додати нового адміністратора</h2>
      <input
        type="email"
        value={newAdminEmail}
        onChange={(e) => setNewAdminEmail(e.target.value)}
        placeholder="Електронна пошта нового адміністратора"
      />
      <button onClick={addAdmin}>Додати адміністратора</button>
    </Layout>
  );
}

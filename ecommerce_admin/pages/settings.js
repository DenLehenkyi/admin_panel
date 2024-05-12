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
      <h1 className="text-gray-800 mb-4 text-lg">Налаштування</h1>
      
      <div className="mb-4">
        <h2 className="text-gray-800 mb-2 text-lg">Список адміністраторів</h2>
        <table className="w-full bg-white rounded-sm shadow-md">
          <thead>
            <tr>
              <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">Електронна пошта</th>
              <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">Дії</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td className="px-4 py-1 border border-gray-200">{admin.email}</td>
                <td className="px-4 py-1 border border-gray-200">
                  <button onClick={() => deleteAdmin(admin.email)} className=" btn-red mx-auto">Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h2 className="text-gray-800 mb-2 text-lg">Додати нового адміністратора</h2>
        <input
          type="email"
          value={newAdminEmail}
          onChange={(e) => setNewAdminEmail(e.target.value)}
          placeholder="Електронна пошта нового адміністратора"
          className="border border-gray-200 rounded-lg px-1 w-full py-2 px-3 mb-2 focus:border-blue-900"
        />
        <button onClick={addAdmin} className="btn-primary">Додати адміністратора</button>
      </div>
    </Layout>
  );
}

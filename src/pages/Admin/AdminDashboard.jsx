import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaPlus, FaSearch, FaSignOutAlt, FaUsers } from "react-icons/fa";
import "./AdminDashboard.css";

const PRODUCTS_KEY = "adminProducts";
const USERS_KEY = "adminUsers";

function readList(key) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch {
    return null;
  }
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState("products");
  const [products, setProducts] = useState(() => readList(PRODUCTS_KEY) || []);
  const [users, setUsers] = useState(() => readList(USERS_KEY) || []);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(readList(PRODUCTS_KEY) === null || readList(USERS_KEY) === null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    const needsProducts = readList(PRODUCTS_KEY) === null;
    const needsUsers = readList(USERS_KEY) === null;
    async function loadData() {
      try {
        const [productResponse, userResponse] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=100"),
          fetch("https://dummyjson.com/users?limit=100"),
        ]);
        if (!productResponse.ok || !userResponse.ok) throw new Error("Could not load records");
        const [productData, userData] = await Promise.all([productResponse.json(), userResponse.json()]);
        if (!active) return;
        if (needsProducts) {
          const initialProducts = productData.products || [];
          setProducts(initialProducts);
          localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
        }
        if (needsUsers) {
          const initialUsers = userData.users || [];
          setUsers(initialUsers);
          localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
        }
      } catch {
        if (active) {
          setLoadError("Unable to reach the record service. You can still create records here.");
          if (needsProducts) localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
          if (needsUsers) localStorage.setItem(USERS_KEY, JSON.stringify([]));
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (readList(PRODUCTS_KEY) !== null) localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (readList(USERS_KEY) !== null) localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const records = section === "products" ? products : users;
  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return records;
    return records.filter((record) => `${record.title || ""} ${record.firstName || ""} ${record.lastName || ""} ${record.email || ""} ${record.category || ""} ${record.username || ""}`.toLowerCase().includes(query));
  }, [records, search]);

  if (sessionStorage.getItem("adminSession") !== "true") return <Navigate to="/" replace />;

  function closeForm() {
    setModalOpen(false);
    setEditing(null);
  }

  function switchSection(nextSection) {
    setSection(nextSection);
    setSearch("");
    closeForm();
  }

  function openForm(record = null) {
    setEditing(record);
    setModalOpen(true);
    setForm(section === "products"
      ? { title: record?.title || "", category: record?.category || "", price: record?.price ?? "", stock: record?.stock ?? "", thumbnail: record?.thumbnail || "", description: record?.description || "" }
      : { firstName: record?.firstName || "", lastName: record?.lastName || "", username: record?.username || "", email: record?.email || "", phone: record?.phone || "", age: record?.age ?? "" });
  }

  function saveRecord(event) {
    event.preventDefault();
    const currentRecords = section === "products" ? products : users;
    const nextId = Math.max(0, ...currentRecords.map((record) => Number(record.id) || 0)) + 1;
    const nextRecord = section === "products"
      ? { ...form, price: Number(form.price), stock: Number(form.stock), id: editing?.id ?? nextId }
      : { ...form, age: Number(form.age), id: editing?.id ?? nextId };
    if (section === "products") {
      setProducts(editing ? products.map((record) => record.id === editing.id ? nextRecord : record) : [nextRecord, ...products]);
    } else {
      setUsers(editing ? users.map((record) => record.id === editing.id ? nextRecord : record) : [nextRecord, ...users]);
    }
    closeForm();
  }

  function deleteRecord(id) {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    if (section === "products") setProducts(products.filter((record) => record.id !== id));
    else setUsers(users.filter((record) => record.id !== id));
  }

  function signOut() {
    sessionStorage.removeItem("adminSession");
    localStorage.removeItem("adminSession");
    navigate("/");
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span>SS</span><div><strong>ShopStream</strong><small>CONTROL ROOM</small></div></div>
        <div className="admin-side-label">WORKSPACE</div>
        <button className={section === "products" ? "active" : ""} onClick={() => switchSection("products")}><FaBoxOpen /> Products <span>{products.length}</span></button>
        <button className={section === "users" ? "active" : ""} onClick={() => switchSection("users")}><FaUsers /> Users <span>{users.length}</span></button>
        <button className="admin-logout" onClick={signOut}><FaSignOutAlt /> Sign out</button>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar"><div><span>ADMINISTRATION</span><h1>{section === "products" ? "Products" : "Users"}</h1></div><div className="admin-avatar">A</div></header>
        <div className="admin-content">
          <div className="admin-summary"><div><span>{section === "products" ? "CATALOG RECORDS" : "REGISTERED USERS"}</span><strong>{records.length.toLocaleString()}</strong><small>{section === "products" ? "Items in your catalog" : "Accounts in your directory"}</small></div><div className="summary-mark">{section === "products" ? <FaBoxOpen /> : <FaUsers />}</div></div>
          <div className="admin-toolbar">
            <label className="admin-search"><FaSearch /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${section}...`} /></label>
            <button className="admin-add" onClick={() => openForm()}><FaPlus /> Add {section === "products" ? "product" : "user"}</button>
          </div>
          {loadError && <p className="admin-notice">{loadError}</p>}
          <div className="admin-table-wrap">
            {loading ? <div className="admin-empty">Loading records...</div> : filteredRecords.length === 0 ? <div className="admin-empty">No {section} found.</div> : (
              <table className="admin-table">
                <thead><tr>{section === "products" ? <><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th></> : <><th>NAME</th><th>USERNAME</th><th>EMAIL</th><th>PHONE</th></>}<th>ACTIONS</th></tr></thead>
                <tbody>{filteredRecords.map((record) => <tr key={record.id}>
                  {section === "products" ? <><td><div className="record-primary">{record.thumbnail && <img src={record.thumbnail} alt="" />}<div><strong>{record.title}</strong><small>Product #{record.id}</small></div></div></td><td><span className="record-tag">{record.category || "Uncategorized"}</span></td><td>${Number(record.price || 0).toFixed(2)}</td><td>{record.stock ?? "—"}</td></> : <><td><div className="record-primary user-record"><div className="user-initial">{(record.firstName || record.username || "U").charAt(0)}</div><div><strong>{record.firstName} {record.lastName}</strong><small>User #{record.id}</small></div></div></td><td>{record.username || "—"}</td><td>{record.email || "—"}</td><td>{record.phone || "—"}</td></>}
                  <td><div className="admin-row-actions"><button onClick={() => openForm(record)}>Edit</button><button className="delete-action" onClick={() => deleteRecord(record.id)}>Delete</button></div></td>
                </tr>)}</tbody>
              </table>
            )}
          </div>
          <footer className="admin-table-footer">Showing {filteredRecords.length} of {records.length} {section}</footer>
        </div>
      </section>

      {modalOpen && <div className="admin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeForm(); }}>
        <form className="admin-modal" onSubmit={saveRecord}>
          <div className="admin-modal-heading"><div><span>{editing ? "UPDATE RECORD" : "NEW RECORD"}</span><h2>{editing ? "Edit" : "Add"} {section === "products" ? "product" : "user"}</h2></div><button type="button" aria-label="Close" onClick={closeForm}>×</button></div>
          {section === "products" ? <>
            <label>Product name<input required value={form.title ?? ""} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
            <div className="admin-form-row"><label>Category<input required value={form.category ?? ""} onChange={(event) => setForm({ ...form, category: event.target.value })} /></label><label>Price<input required min="0" step="0.01" type="number" value={form.price ?? ""} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label></div>
            <div className="admin-form-row"><label>Stock<input required min="0" type="number" value={form.stock ?? ""} onChange={(event) => setForm({ ...form, stock: event.target.value })} /></label><label>Image URL<input type="url" value={form.thumbnail ?? ""} onChange={(event) => setForm({ ...form, thumbnail: event.target.value })} /></label></div>
            <label>Description<textarea rows="3" value={form.description ?? ""} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          </> : <>
            <div className="admin-form-row"><label>First name<input required value={form.firstName ?? ""} onChange={(event) => setForm({ ...form, firstName: event.target.value })} /></label><label>Last name<input required value={form.lastName ?? ""} onChange={(event) => setForm({ ...form, lastName: event.target.value })} /></label></div>
            <label>Username<input required value={form.username ?? ""} onChange={(event) => setForm({ ...form, username: event.target.value })} /></label>
            <label>Email<input required type="email" value={form.email ?? ""} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
            <div className="admin-form-row"><label>Phone<input value={form.phone ?? ""} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label><label>Age<input min="0" type="number" value={form.age ?? ""} onChange={(event) => setForm({ ...form, age: event.target.value })} /></label></div>
          </>}
          <div className="admin-modal-actions"><button type="button" onClick={closeForm}>Cancel</button><button className="admin-add" type="submit">{editing ? "Save changes" : "Create record"}</button></div>
        </form>
      </div>}
    </main>
  );
}

export { AdminDashboard };

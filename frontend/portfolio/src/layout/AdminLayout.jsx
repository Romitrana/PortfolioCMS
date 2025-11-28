import DashboardLayout from "../components/AdminComponents/DashboardLayout"
export default function AdminLayout() {
  const nameAdmin = JSON.parse(localStorage.getItem('admin_user'))["name"];
  return (
    <DashboardLayout adminName={nameAdmin}/>
  )
}

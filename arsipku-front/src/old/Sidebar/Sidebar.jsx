import "./Sidebar.css";
import {
  Home,
  Print,
  Search,
  FileCopy,
  Storage,
  RoomOutlined,
  ApartmentOutlined,
  PersonOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
} from "@material-ui/icons";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <SidebarMenu
          title="Dasbor"
          listMenu={[
            { ListIcon: Home, text: "Beranda" },
            { ListIcon: Search, text: "Cari" },
            { ListIcon: Print, text: "Laporan" },
          ]}
        />

        <SidebarMenu
          title="Data"
          listMenu={[
            { ListIcon: ApartmentOutlined, text: "Gedung" },
            { ListIcon: RoomOutlined, text: "Ruangan" },
            { ListIcon: Storage, text: "Penyimpanan" },
            { ListIcon: FileCopy, text: "Berkas" },
          ]}
        />

        <SidebarMenu
          title="Pengaturan"
          listMenu={[
            { ListIcon: PersonOutlined, text: "Pengguna" },
            { ListIcon: SettingsOutlined, text: "Sistem" },
            { ListIcon: ExitToAppOutlined, text: "Keluar" },
          ]}
        />
      </div>
    </div>
  );
}

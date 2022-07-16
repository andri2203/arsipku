import {
  Home,
  Print,
  Search,
  FileCopy,
  Storage,
  ApartmentOutlined,
  Person,
  Settings,
  Room,
} from "@material-ui/icons";

import Beranda from "../pages/Beranda";
import Berkas from "../pages/Berkas";
import Cari from "../pages/Cari";
import Gedung from "../pages/Gedung";
import Laporan from "../pages/Laporan";
import LokasiBerkas from "../pages/LokasiBerkas";
import Pengguna from "../pages/Pengguna";
import Penyimpanan from "../pages/Penyimpanan";
import Ruangan from "../pages/Ruangan";
import Sistem from "../pages/Sistem";

const pages = [
  { ListIcon: Home, text: "Beranda", toLink: "/", Component: Beranda },
  { ListIcon: Search, text: "Cari", toLink: "/cari", Component: Cari },
  {
    ListIcon: ApartmentOutlined,
    text: "Gedung",
    toLink: "/gedung",
    Component: Gedung,
  },
  {
    ListIcon: Room,
    text: "Ruangan",
    toLink: "/ruangan",
    Component: Ruangan,
  },
  {
    ListIcon: Storage,
    text: "Penyimpanan",
    toLink: "/penyimpanan",
    Component: Penyimpanan,
  },
  {
    ListIcon: FileCopy,
    text: "Berkas",
    toLink: "/berkas",
    Component: Berkas,
  },
  {
    ListIcon: FileCopy,
    text: "Lokasi Berkas",
    toLink: "/lokasi-berkas",
    Component: LokasiBerkas,
  },
  {
    ListIcon: Print,
    text: "Laporan",
    toLink: "/laporan",
    Component: Laporan,
  },
  {
    ListIcon: Person,
    text: "Pengguna",
    toLink: "/pengguna",
    Component: Pengguna,
  },
  {
    ListIcon: Settings,
    text: "Sistem",
    toLink: "/sistem",
    Component: Sistem,
  },
];

export default pages;

import { Fragment, useState } from "react";

import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Drawer,
} from "@mui/material";

import {
  ArrowCircleRight,
  ExpandLess,
  ExpandMore,
  Folder,
  Settings,
  Home,
  Storage,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function SwipeDrawer(props) {
  // initialize Props
  const { subHeader } = props;

  //   state variables collapse nested List
  const [collapsed, setCollapsed] = useState("");

  //   handle Nested List
  const handleCollapse = (collapseID) => {
    if (collapsed != collapseID) {
      setCollapsed(collapseID);
    } else {
      setCollapsed("");
    }
  };

  const listMenu = [
    {
      group: "master",
      name: "Master",
      IconList: Storage,
      link: [
        {
          text: "Gedung",
          toLink: "/gedung",
        },
        {
          text: "Ruangan",
          toLink: "/ruangan",
        },
        {
          text: "Penyimpanan",
          toLink: "/penyimpanan",
        },
      ],
    },
    {
      group: "berkas",
      name: "Berkas",
      IconList: Folder,
      link: [
        { text: "Cari Berkas", toLink: "/cari" },
        { text: "Berkas", toLink: "/berkas" },
        { text: "Lokasi Berkas", toLink: "/lokasi-berkas" },
        { text: "Laporan", toLink: "/laporan" },
      ],
    },
    {
      group: "pengaturan",
      name: "Pengaturan",
      IconList: Settings,
      link: [
        {
          text: "Pengguna",
          toLink: "/pengguna",
        },
        {
          text: "Sistem",
          toLink: "/sistem",
        },
      ],
    },
  ];

  return (
    <Drawer anchor="left" variant="permanent">
      <Box sx={{ width: "200px" }}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list">
              {subHeader}
            </ListSubheader>
          }
        >
          {/* Beranda */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "var(--bs-gray-dark)",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Beranda" />
            </ListItemButton>
          </Link>

          {listMenu.map(({ group, name, IconList, link }, i) => (
            <Fragment key={i}>
              <ListItemButton onClick={() => handleCollapse(group)}>
                <ListItemIcon>
                  <IconList />
                </ListItemIcon>
                <ListItemText primary={name} />
                {collapsed == group ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                key={i}
                in={collapsed == group ? true : false}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {link.map(({ text, toLink }, idx) => (
                    <Link
                      key={i + "-" + idx}
                      to={toLink}
                      style={{
                        textDecoration: "none",
                        color: "var(--bs-gray-dark)",
                      }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <ArrowCircleRight />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default SwipeDrawer;

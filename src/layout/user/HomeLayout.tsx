import React, {useState} from "react";
import "../../styles/style.scss";
import "../../styles/global.scss";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import CategoryIcon from "@mui/icons-material/Category";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
  {text: "Trang chủ", icon: <HomeIcon />},
  {text: "Bảng xếp hạng", icon: <ListIcon />},
  {text: "Chủ đề và thể loại", icon: <CategoryIcon />},
  {
    text: "Thư viện",
    icon: <LibraryMusicIcon />,
    children: ["Danh sách yêu thích", "Nghe gần đây", "Playlist của tôi"],
  },
  {text: "Cài đặt", icon: <SettingsIcon />},
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src="/image/logo.png" alt="Logo" className="logo-img" />
      </div>
      <div className="sidebar-divider" />
      <ul className="nav-list">
        {navItems.map((item, idx) => (
          <div key={item.text}>
            <li
              className={`nav-item${activeIndex === idx ? " active" : ""}`}
              key={item.text}
              onClick={() => {
                setActiveIndex(idx);
                if (item.children) {
                  toggleSubMenu();
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.text}</span>
            </li>
            {item.children && showSubMenu && (
              <ul className="sub-menu">
                {item.children.map((child) => (
                  <li className="sub-menu-item" key={child}>
                    {child}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </aside>
  );
};

const Header = () => (
  <header className="header-placeholder">
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input className="custom-input" placeholder="Bạn muốn nghe gì" />
    </div>
    <div className="header-actions">
      <SettingsIcon className="icon" />
      <button className="login-btn">Đăng nhập</button>
    </div>
  </header>
);

const HomeLayout = ({children}: {children: React.ReactNode}) => (
  <div
    className="main-gradient-bg"
    style={{display: "flex", minHeight: "100vh", width: "100vw"}}
  >
    <Sidebar />
    <div className="layout-content">
      <Header />
      <main className="page-content">{children}</main>
    </div>
  </div>
);

export default HomeLayout;

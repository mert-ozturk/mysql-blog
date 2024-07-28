 
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
    LayoutDashboard,
    Shapes,
    ShoppingBag,
    House,
    NotebookPen,
    Newspaper,
    Mail,
    Building2,
    Tag,
    UsersRound,
    Text,
  } from "lucide-react";
  
  export const navLinks = [
    {
      url: "/",
      icon:  <House />,
      label: "Home",
    },
    {
      url: "/blog",
      icon: <MenuBookIcon />,
      label: "Blog",
    },
    
    {
      url: "/write",
      icon: <NotebookPen />,
      label: "Write-Blog",
    },
    {
      url: "/about",
      icon: <Building2 />,
      label: "About",
    },
    {
      url: "/contact",
      icon: <Mail />,
      label: "Contact",
    },
    {
      url: "/chat",
      icon: <Text />,
      label: "Chat",
    },
    
   
  ];
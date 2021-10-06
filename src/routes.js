/*!

=========================================================
* AMI | Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TravelProfile from "views/TravelProfile.js";
import Reservasi from "views/Reservasi.js";
import ReservasiList from "views/ReservasiList";
import ReservasiDetail from "views/ReservasiDetail";
import Muthowif from "views/Muthowif.js";
import Travel from "views/Travel.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import ReservasiForm from "views/ReservasiForm";
import Settings from "views/Settings";

const data = localStorage.getItem('dataUser');
const dataJson = JSON.parse(data);

let dashboardRoutes;

if (dataJson && dataJson.role === 1) {
  dashboardRoutes = [
    {
      path: "/muthowif",
      name: "Muthowif",
      icon: "nc-icon nc-single-02",
      component: Muthowif,
      layout: "/admin",
      sidebar: true
    },
    {
      path: "/travel",
      name: "Travel",
      icon: "nc-icon nc-istanbul",
      component: Travel,
      layout: "/admin",
      sidebar: true
    },
    {
      path: "/reservasi-list",
      name: "Reservasi List",
      icon: "nc-icon nc-notes",
      component: ReservasiList,
      layout: "/admin",
      sidebar: true
    },
    {
      path: "/setting",
      name: "Setting",
      icon: "nc-icon nc-settings-gear-64",
      component: Settings,
      layout: "/admin",
      sidebar: true
    },
    {
      path: "/reservasi-detail/:id",
      name: "Reservasi Detail",
      icon: "nc-icon nc-notes",
      component: ReservasiDetail,
      layout: "/admin",
      sidebar: false
    },
  ];
} else {
  dashboardRoutes = [
    // {
    //   path: "/dashboard",
    //   name: "Dashboard",
    //   icon: "nc-icon nc-chart-pie-35",
    //   component: Dashboard,
    //   layout: "/admin",
    //   sidebar: true
    // },
    // {
    //   path: "/muthowif",
    //   name: "Muthowif",
    //   icon: "nc-icon nc-single-02",
    //   component: Muthowif,
    //   layout: "/admin",
    // sidebar: true
    // },
    // {
    //   path: "/travel",
    //   name: "Travel",
    //   icon: "nc-icon nc-istanbul",
    //   component: Travel,
    //   layout: "/admin",
    // sidebar: true
    // },
    {
      path: "/reservasi",
      name: "Reservasi",
      icon: "nc-icon nc-notes",
      component: Reservasi,
      layout: "/admin",
      sidebar: true
    },
    {
      path: "/reservasi-list",
      name: "Reservasi List",
      icon: "nc-icon nc-notes",
      component: ReservasiList,
      layout: "/admin",
      sidebar: true
    },
    {
      path: "/travel",
      name: "Travel Profile",
      icon: "nc-icon nc-circle-09",
      component: TravelProfile,
      layout: "/admin",
      sidebar: true
    },
    {
      path: "/reservasi-detail/:id",
      name: "Reservasi Detail",
      icon: "nc-icon nc-notes",
      component: ReservasiDetail,
      layout: "/admin",
      sidebar: false
    },
    // {
    //   path: "/table",
    //   name: "Table List",
    //   icon: "nc-icon nc-notes",
    //   component: TableList,
    //   layout: "/admin",
    //   sidebar: true
    // },
    // {
    //   path: "/typography",
    //   name: "Typography",
    //   icon: "nc-icon nc-paper-2",
    //   component: Typography,
    //   layout: "/admin",
    //   sidebar: true
    // },
    // {
    //   path: "/icons",
    //   name: "Icons",
    //   icon: "nc-icon nc-atom",
    //   component: Icons,
    //   layout: "/admin",
    //   sidebar: true
    // },
    // {
    //   path: "/maps",
    //   name: "Maps",
    //   icon: "nc-icon nc-pin-3",
    //   component: Maps,
    //   layout: "/admin",
    //   sidebar: true
    // },
    // {
    //   path: "/notifications",
    //   name: "Notifications",
    //   icon: "nc-icon nc-bell-55",
    //   component: Notifications,
    //   layout: "/admin",
    //   sidebar: true
    // },
    // {
    //   path: "/reservasi-form",
    //   name: "ReservasiForm",
    //   icon: "nc-icon nc-notes",
    //   component: ReservasiForm,
    //   layout: "/admin",
    //   sidebar: true
    // }
  ];
}



export default dashboardRoutes;

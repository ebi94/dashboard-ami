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
import Muthowif from "views/Muthowif.js";
import Travel from "views/Travel.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import ReservasiForm from "views/ReservasiForm";

const data = localStorage.getItem('dataUser');
const dataJson = JSON.parse(data);
console.log('data json', dataJson)

let dashboardRoutes;

if (dataJson && dataJson.role === 1) {
  dashboardRoutes = [
    // {
    //   path: "/dashboard",
    //   name: "Dashboard",
    //   icon: "nc-icon nc-chart-pie-35",
    //   component: Dashboard,
    //   layout: "/admin",
    // },
    {
      path: "/muthowif",
      name: "Muthowif",
      icon: "nc-icon nc-single-02",
      component: Muthowif,
      layout: "/admin",
    },
    {
      path: "/travel",
      name: "Travel",
      icon: "nc-icon nc-istanbul",
      component: Travel,
      layout: "/admin",
    },
    // {
    //   path: "/reservasi",
    //   name: "Reservasi",
    //   icon: "nc-icon nc-notes",
    //   component: Reservasi,
    //   layout: "/admin",
    // },
    // {
    //   path: "/user",
    //   name: "User Profile",
    //   icon: "nc-icon nc-circle-09",
    //   component: UserProfile,
    //   layout: "/admin",
    // },
    // {
    //   path: "/table",
    //   name: "Table List",
    //   icon: "nc-icon nc-notes",
    //   component: TableList,
    //   layout: "/admin",
    // },
    // {
    //   path: "/typography",
    //   name: "Typography",
    //   icon: "nc-icon nc-paper-2",
    //   component: Typography,
    //   layout: "/admin",
    // },
    {
      path: "/icons",
      name: "Icons",
      icon: "nc-icon nc-atom",
      component: Icons,
      layout: "/admin",
    },
    // {
    //   path: "/maps",
    //   name: "Maps",
    //   icon: "nc-icon nc-pin-3",
    //   component: Maps,
    //   layout: "/admin",
    // },
    // {
    //   path: "/notifications",
    //   name: "Notifications",
    //   icon: "nc-icon nc-bell-55",
    //   component: Notifications,
    //   layout: "/admin",
    // },
    // {
    //   path: "/reservasi-form",
    //   name: "ReservasiForm",
    //   icon: "nc-icon nc-notes",
    //   component: ReservasiForm,
    //   layout: "/admin",
    // }
  ];
} else {
  dashboardRoutes = [
    // {
    //   path: "/dashboard",
    //   name: "Dashboard",
    //   icon: "nc-icon nc-chart-pie-35",
    //   component: Dashboard,
    //   layout: "/admin",
    // },
    // {
    //   path: "/muthowif",
    //   name: "Muthowif",
    //   icon: "nc-icon nc-single-02",
    //   component: Muthowif,
    //   layout: "/admin",
    // },
    // {
    //   path: "/travel",
    //   name: "Travel",
    //   icon: "nc-icon nc-istanbul",
    //   component: Travel,
    //   layout: "/admin",
    // },
    {
      path: "/reservasi",
      name: "Reservasi",
      icon: "nc-icon nc-notes",
      component: Reservasi,
      layout: "/admin",
    },
    {
      path: "/reservasi-list",
      name: "Reservasi List",
      icon: "nc-icon nc-notes",
      component: ReservasiList,
      layout: "/admin",
    },
    {
      path: "/travel",
      name: "Travel Profile",
      icon: "nc-icon nc-circle-09",
      component: TravelProfile,
      layout: "/admin",
    },
    // {
    //   path: "/table",
    //   name: "Table List",
    //   icon: "nc-icon nc-notes",
    //   component: TableList,
    //   layout: "/admin",
    // },
    // {
    //   path: "/typography",
    //   name: "Typography",
    //   icon: "nc-icon nc-paper-2",
    //   component: Typography,
    //   layout: "/admin",
    // },
    // {
    //   path: "/icons",
    //   name: "Icons",
    //   icon: "nc-icon nc-atom",
    //   component: Icons,
    //   layout: "/admin",
    // },
    // {
    //   path: "/maps",
    //   name: "Maps",
    //   icon: "nc-icon nc-pin-3",
    //   component: Maps,
    //   layout: "/admin",
    // },
    // {
    //   path: "/notifications",
    //   name: "Notifications",
    //   icon: "nc-icon nc-bell-55",
    //   component: Notifications,
    //   layout: "/admin",
    // },
    // {
    //   path: "/reservasi-form",
    //   name: "ReservasiForm",
    //   icon: "nc-icon nc-notes",
    //   component: ReservasiForm,
    //   layout: "/admin",
    // }
  ];
}



export default dashboardRoutes;

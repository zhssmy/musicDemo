import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/artist",
    children: [
      {
        path: "/artist",
        name: "artist",
        component: () => import("../views/artist/index.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/about/index.vue"),
      },
      {
        path: "/album",
        name: "album",
        component: () => import("../views/album/index.vue"),
      },
      {
        path: "/song",
        name: "song",
        component: () => import("../views/song/index.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

const routes = [
    {
        name: "toLogin",
        path: "/toLogin",
        component:() => import("@/components/toLogin")
    },{
        path: "/",
        redirect: "/toLogin"
    },{
        name: "toIndex",
        path: "/toIndex",
        component:() => import("@/components/toIndex"),
        children: [
            {
                name: "toList",
                path: "/toList",
                component:() => import("@/components/toList")
            },{
                name: "toView",
                path: "/toView",
                component:() => import("@/components/toView")
            },{
                path: "",
                redirect: "/toList"
            }
        ]
    },{
        name: "toMine",
        path: "/toMine",
        component:() => import("@/components/toMine")
    }
];



export default routes
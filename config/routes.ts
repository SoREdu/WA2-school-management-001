/**
 * @name umi routing configuration
 * @description Only supports path,component,routes,redirect,wrappers,name,icon
 * @param path  path Only two placeholder configurations are supported, the first is dynamic parameters :id.
 * @param component Configure the React component path used for rendering after location and path match (src/pages).
 * @param routes Configure sub-routes, usually used when you need to add layout components to multiple paths。
 * @param redirect Configure route jump
 * @param wrappers Configure the packaging component of the routing component. Through the packaging component, you can combine more functions into the current routing component. For example, it can be used for routing-level permission verification.
 * @param name Configure the title of the route. By default, the value of menu.xxxx in the internationalization file menu.ts is read. If the name is configured as login, the value of menu.login in menu.ts is read as the title.
 * @param icon Icon for configuring routing, value reference https://ant.design/components/icon-cn， Pay attention to removing the style suffix and capitalization. If you want to configure the icon as <StepBackwardOutlined />, the value should be stepBackward or StepBackward. If you want to configure the icon as <UserOutlined />, the value should be user or User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'dashboard',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/main',
      },
      {
        path: '/admin/main',
        name: 'main',
        component: './Dashboard/Admin',
      },
      {
        path: '/admin/analytics',
        name: 'analytics',
        component: './Dashboard/Analytics',
      },
    ],
  },
  {
    path: '/subscriber',
    name: 'subscriber',
    icon: 'form',
    access: 'canAdmin',
    routes: [
      {
        path: '/subscriber',
        redirect: '/subscriber/list',
      },
      {
        path: '/subscriber/list',
        name: 'list',
        component: './SubscriberManagement/SubscriberList',
      },
    ],
  },
  {
    path: '/student',
    name: 'student',
    icon: 'user',
    access: 'canAdmin',
    routes: [
      {
        path: '/student',
        redirect: '/student/list',
      },
      {
        path: '/student/list',
        name: 'list',
        component: './StudentManagement/StudentList',
      },
      {
        path: '/student/arrangeclass',
        name: 'arrangeclass',
        component: './StudentManagement/ArrangeClass',
      },
      {
        path: '/student/scores',
        name: 'scores',
        component: './StudentManagement/StudentScores',
      },
    ],
  },
  {
    path: '/class',
    name: 'class',
    icon: 'book',
    access: 'canAdmin',
    routes: [
      {
        path: '/class',
        redirect: '/class/list',
      },
      {
        path: '/class/list',
        name: 'list',
        component: './ClassManagement/ClassList',
      },
      {
        path: '/class/arrangesubjects',
        name: 'arrangesubjects',
        component: './ClassManagement/ArrangeSubjects',
      },
    ],
  },
  {
    path: '/employee',
    name: 'employee',
    icon: 'team',
    access: 'canAdmin',
    routes: [
      {
        path: '/employee',
        redirect: '/employee/list',
      },
      {
        path: '/employee/list',
        name: 'list',
        component: './EmployeeManagement/EmployeeList',
      },
      {
        path: '/employee/teacher',
        name: 'teacher',
        component: './EmployeeManagement/TeacherList',
      },
      {
        path: '/employee/salary',
        name: 'salary',
        component: './EmployeeManagement/SalaryStatistical',
      },
      {
        path: '/employee/admincall',
        name: 'admincall',
        component: './EmployeeManagement/AdminCallLog',
      },
    ],
  },
  {
    path: '/subjects',
    name: 'subjects',
    icon: 'database',
    access: 'canAdmin',
    routes: [
      {
        path: '/subjects',
        redirect: '/subjects/list',
      },
      {
        path: '/subjects/list',
        name: 'list',
        component: './SubjectsManagement/SubjectsList',
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    icon: 'Setting',
    access: 'canAdmin',
    routes: [
      {
        path: '/settings',
        redirect: '/settings/schoolmanagement',
      },
      {
        path: '/settings/schoolmanagement',
        name: 'schoolmanagement',
        component: './Settings/SchoolManagementSetting',
      },
      {
        path: '/settings/landing',
        name: 'landing',
        component: './Settings/LandingPageSetting',
      },
      {
        path: '/settings/contactsor',
        name: 'contactsor',
        component: './Settings/ContactSoR',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

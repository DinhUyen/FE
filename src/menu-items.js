// const menuItems = {
//   items: [
//     // {
//     //   id: 'navigation',
//     //   title: 'Navigation',
//     //   type: 'group',
//     //   icon: 'icon-navigation',
//     //   children: [
//     //     {
//     //       id: 'dashboard',
//     //       title: 'Dashboard',
//     //       type: 'item',
//     //       url: '/app/dashboard/default',
//     //       icon: 'feather icon-home',
//     //     }
//     //   ]
//     // },
//     {
//       id: 'ui-element',
//       title: 'UI ELEMENT',
//       type: 'group',
//       icon: 'icon-ui',
//       children: [
//         {
//           id: 'basic',
//           title: 'Component',
//           type: 'collapse',
//           icon: 'feather icon-box',
//           children: [

//             {
//               id: 'button',
//               title: 'Button',
//               type: 'item',
//               url: '/basic/button'
//             },
//             {
//               id: 'badges',
//               title: 'Badges',
//               type: 'item',
//               url: '/basic/badges'
//             },
//             {
//               id: 'breadcrumb',
//               title: 'Breadcrumb',
//               type: 'item',
//               url: '/basic/breadcrumb'
//             },
//             {
//               id: 'pagination',
//               title: 'Pagination',
//               type: 'item',
//               url: '/basic/pagination'
//           },
//             {
//               id: 'collapse',
//               title: 'Collapse',
//               type: 'item',
//               url: '/basic/collapse'
//             },
//             {
//               id: 'tabs-pills',
//               title: 'Tabs & Pills',
//               type: 'item',
//               url: '/basic/tabs-pills'
//             },
//             {
//               id: 'typography',
//               title: 'Typography',
//               type: 'item',
//               url: '/basic/typography'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: 'forms-tables',
//       title: 'Forms & Tables',
//       type: 'group',
//       icon: 'icon-group',
//       children: [
//         {
//           id: 'forms',
//           title: 'Form Elements',
//           type: 'item',
//           url: '/forms/form-basic',
//           icon: 'feather icon-file-text',
//         },
//         {
//           id: 'tables',
//           title: 'Table',
//           type: 'item',
//           url: '/tables/bootstrap',
//           icon: 'feather icon-server',
//         }
//       ]
//     },
//     {
//       id: 'chart-maps',
//       title: 'Chart & Maps',
//       type: 'group',
//       icon: 'icon-charts',
//       children: [
//         {
//           id: 'charts',
//           title: 'Charts',
//           type: 'item',
//           url: '/charts/nvd3',
//           icon: 'feather icon-pie-chart'
//         },
//         {
//           id: 'maps',
//           title: 'Map',
//           type: 'item',
//           url: '/maps/google-map',
//           icon: 'feather icon-map'
//         }
//       ]
//     },
//     {
//       id: 'pages',
//       title: 'Pages',
//       type: 'group',
//       icon: 'icon-pages',
//       children: [
//         {
//           id: 'auth',
//           title: 'Authentication',
//           type: 'collapse',
//           icon: 'feather icon-lock',
//           badge: {
//             title: 'New',
//             type: 'label-danger'
//         },
//           children: [
//             {
//               id: 'signup-1',
//               title: 'Sign up',
//               type: 'item',
//               url: '/auth/signup-1',
//               target: true,
//               breadcrumbs: false
//             },

//             {
//               id: 'signin-1',
//               title: 'Sign in',
//               type: 'item',
//               url: '/auth/signin-1',
//               target: true,
//               breadcrumbs: false
//             }
//           ]
//         },
//         {
//           id: 'sample-page',
//           title: 'Sample Page',
//           type: 'item',
//           url: '/sample-page',
//           classes: 'nav-item',
//           icon: 'feather icon-sidebar'
//         },
//         {
//           id: 'documentation',
//           title: 'Documentation',
//           type: 'item',
//           icon: 'feather icon-help-circle',
//           classes: 'nav-item',
//           url: 'https://codedthemes.com/item/datta-able-react-free-admin-template/#',
//           target: true,
//           external: true
//         },
//         {
//           id: 'menu-level',
//           title: 'Menu Levels',
//           type: 'collapse',
//           icon: 'feather icon-menu',
//           children: [
//             {
//               id: 'menu-level-1.1',
//               title: 'Menu Level 1.1',
//               type: 'item',
//               url: '#!'
//             },
//             {
//               id: 'menu-level-1.2',
//               title: 'Menu Level 2.2',
//               type: 'collapse',
//               children: [
//                 {
//                   id: 'menu-level-2.1',
//                   title: 'Menu Level 2.1',
//                   type: 'item',
//                   url: '#'
//                 },
//                 {
//                   id: 'menu-level-2.2',
//                   title: 'Menu Level 2.2',
//                   type: 'collapse',
//                   children: [
//                     {
//                       id: 'menu-level-3.1',
//                       title: 'Menu Level 3.1',
//                       type: 'item',
//                       url: '#'
//                     },
//                     {
//                       id: 'menu-level-3.2',
//                       title: 'Menu Level 3.2',
//                       type: 'item',
//                       url: '#'
//                     }
//                   ]
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           id: 'disabled-menu',
//           title: 'Disabled Menu',
//           type: 'item',
//           url: '#',
//           classes: 'nav-item disabled',
//           icon: 'feather icon-power'
//         }
//       ]
//     }
//   ]
// };

// export default menuItems;

const menuItems = {
  items: [
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'trangchu',
          title: 'Trang ch???',
          type: 'collapse',
          icon: 'feather icon-home',
          children: [
            {
              id: 'cve',
              title: 'CVE trend',
              type: 'item',
              url: '/tables/bootstrap',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'user',
          title: 'Qu???n l?? ng?????i d??ng',
          type: 'item',
          url: '/users/list',
          classes: 'nav-item',
          icon: 'feather icon-user'
        },
        {
          id: 'trinhsat',
          title: 'Qu???n l?? trinh s??t',
          type: 'collapse',
          icon: 'feather icon-search',
          children: [
            {
              id: 'listOjects',
              title: 'Danh s??ch ?????i t?????ng',
              type: 'item',
              url: '/scan/website',
              target: true,
              breadcrumbs: false
            },

            {
              id: 'listChecks',
              title: 'Danh s??ch r?? so??t',
              type: 'item',
              url: '/scan/vulnerability/result',
              target: true,
              breadcrumbs: false
            },

            {
              id: 'listChecks',
              title: 'Chi ti???t r?? so??t',
              type: 'item',
              url: '/scan/vulnerability/vulnerability',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        ,
        {
          id: 'engine',
          title: 'Qu???n l?? eninge',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'listEngine',
              title: 'Danh s??ch engine',
              type: 'item',
              url: '/engine/list_engine',
              target: true,
              breadcrumbs: false
            },

            {
              id: 'nuclei',
              title: 'Engine Nuclei',
              type: 'item',
              url: '/engine/nuclei',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'nuclei',
              title: 'Engine Acunetix',
              type: 'item',
              url: '/engine/acunetix',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'modules',
          title: 'Qu???n l?? module',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 'listModules',
              title: 'Danh s??ch module',
              type: 'collapse',
              children: [
                {
                  id: 'sqli',
                  title: 'Nh??m l??? h???ng Sqli',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'xss',
                  title: 'Nh??m l??? h???ng XSS',
                  type: 'collapse'
                },
                {
                  id: 'ecc',
                  title: 'Nh??m l??? h???ng ....',
                  type: 'item',
                  url: '#'
                }
              ]
            },
            {
              id: 'group_vul',
              title: 'Danh s??ch module',
              type: 'collapse',
              children: [
                {
                  id: 'sqli',
                  title: 'Nh??m l??? h???ng Sqli',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'xss',
                  title: 'Nh??m l??? h???ng XSS',
                  type: 'collapse'
                },
                {
                  id: 'ecc',
                  title: 'Nh??m l??? h???ng ....',
                  type: 'item',
                  url: '#'
                }
              ]
            }
          ]
        },
        {
          id: 'report',
          title: 'B??o c??o th???ng k??',
          type: 'collapse',
          icon: 'feather icon-file-text',
          children: [
            {
              id: 'listModules',
              title: 'Danh s??ch module',
              type: 'collapse',
              children: [
                {
                  id: 'sqli',
                  title: 'Nh??m l??? h???ng Sqli',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'xss',
                  title: 'Nh??m l??? h???ng XSS',
                  type: 'collapse'
                },
                {
                  id: 'ecc',
                  title: 'Nh??m l??? h???ng ....',
                  type: 'item',
                  url: '#'
                }
              ]
            },
            {
              id: 'group_vul',
              title: 'Danh s??ch module',
              type: 'collapse',
              children: [
                {
                  id: 'sqli',
                  title: 'Nh??m l??? h???ng Sqli',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'xss',
                  title: 'Nh??m l??? h???ng XSS',
                  type: 'collapse'
                },
                {
                  id: 'ecc',
                  title: 'Nh??m l??? h???ng ....',
                  type: 'item',
                  url: '#'
                }
              ]
            }
          ]
        },

        {
          id: 'setting',
          title: 'C??i ?????t',
          type: 'collapse',
          icon: 'feather icon-settings',
          children: [
            {
              id: 'data',
              title: 'Qu???n l?? d??? li???u',
              type: 'collapse',
              children: [
                {
                  id: 'backup',
                  title: 'Sao l??u',
                  type: 'item',
                  url: '/setting/data/backup',
                  target: true,
                  breadcrumbs: false
                },
                {
                  id: 'restore',
                  title: 'Ph???c h???i',
                  type: 'item',
                  url: '/setting/data/restore',
                  target: true,
                  breadcrumbs: false
                }
              ]
            },

            {
              id: 'docker',
              title: 'Qu???n l?? docker',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'system',
              title: 'Qu???n l?? h??? th???ng',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'config',
              title: 'C???u h??nh th??ng b??o (telegram)',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'log',
          title: 'L???ch s??? log',
          type: 'collapse',
          icon: 'feather icon-lock',
          children: [
            {
              id: 'datalog',
              title: 'Qu???n l?? d??? li???u log',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },
            ,
            {
              id: 'resultCheck',
              title: 'Qu???n l?? k???t qu??? r?? so??t',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
          ]
        }
        // {
        //   id: 'disabled-menu',
        //   title: 'Disabled Menu',
        //   type: 'item',
        //   url: '#',
        //   classes: 'nav-item disabled',
        //   icon: 'feather icon-power'
        // }
      ]
    }
  ]
};

export default menuItems;

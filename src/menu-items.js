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
          title: 'Trang chủ',
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
          title: 'Quản lý người dùng',
          type: 'item',
          url: '/users/list',
          classes: 'nav-item',
          icon: 'feather icon-user'
        },
        {
          id: 'trinhsat',
          title: 'Quản lý trinh sát',
          type: 'collapse',
          icon: 'feather icon-search',
          children: [
            {
              id: 'listOjects',
              title: 'Danh sách đối tượng',
              type: 'item',
              url: '/scan/website',
              target: true,
              breadcrumbs: false
            },

            {
              id: 'listChecks',
              title: 'Danh sách rà soát',
              type: 'item',
              url: '/scan/vulnerability/result',
              target: true,
              breadcrumbs: false
            },

            {
              id: 'listCheckDetails',
              title: 'Chi tiết rà soát',
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
          title: 'Quản lý eninge',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'listEngine',
              title: 'Danh sách engine',
              type: 'item',
              url: '/engine/listEngine',
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
              id: 'aucunetix',
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
          title: 'Quản lý module',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 'listModules',
              title: 'Danh sách module',
              type: 'collapse',
              children: [
                {
                  id: 'sqli',
                  title: 'Nhóm lỗ hổng Sqli',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'xss',
                  title: 'Nhóm lỗ hỏng XSS',
                  type: 'collapse'
                },
                {
                  id: 'ecc',
                  title: 'Nhóm lỗ hổng ....',
                  type: 'item',
                  url: '#'
                }
              ]
            },
            {
              id: 'group_vul',
              title: 'Danh sách module',
              type: 'collapse',
              children: [
                {
                  id: 'sqli',
                  title: 'Nhóm lỗ hổng Sqli',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'xss',
                  title: 'Nhóm lỗ hỏng XSS',
                  type: 'collapse'
                },
                {
                  id: 'ecc',
                  title: 'Nhóm lỗ hổng ....',
                  type: 'item',
                  url: '#'
                }
              ]
            }
          ]
        },
        {
          id: 'report_statistic',
          title: 'Báo cáo thống kê',
          type: 'collapse',
          icon: 'feather icon-file-text',
          children: [
            {
              id: 'thongke',
              title: 'Thống kê',
              type: 'collapse'
              // children: [
              //   {
              //     id: 'sqli',
              //     title: 'Nhóm lỗ hổng Sqli',
              //     type: 'item',
              //     url: '#'
              //   },
              //   {
              //     id: 'xss',
              //     title: 'Nhóm lỗ hỏng XSS',
              //     type: 'collapse',

              //   }, {
              //     id: 'ecc',
              //     title: 'Nhóm lỗ hổng ....',
              //     type: 'item',
              //     url: '#'
              //   },
              // ]
            },
            {
              id: 'reports',
              title: 'Báo cáo',
              type: 'collapse',
              children: [
                {
                  id: 'List_reports',
                  title: 'Danh sách báo cáo',
                  type: 'item',
                  url: '/reports/List_reports',
                  target: true,
                  breadcrumbs: false
                },
                {
                  id: 'List_report_templates',
                  title: 'Danh sách mẫu báo cáo',
                  type: 'item',
                  url: '/reports/List_report_templates',
                  target: true,
                  breadcrumbs: false
                }
              ]
            }
          ]
        },

        {
          id: 'setting',
          title: 'Cài đặt',
          type: 'collapse',
          icon: 'feather icon-settings',
          children: [
            {
              id: 'data',
              title: 'Quản lý dữ liệu',
              type: 'collapse',
              children: [
                {
                  id: 'backup',
                  title: 'Sao lưu',
                  type: 'item',
                  url: '/setting/data/backup',
                  target: true,
                  breadcrumbs: false
                },
                {
                  id: 'restore',
                  title: 'Phục hồi',
                  type: 'item',
                  url: '/setting/data/restore',
                  target: true,
                  breadcrumbs: false
                }
              ]
            },

            {
              id: 'docker',
              title: 'Docker',
              type: 'collapse',
              children: [
                {
                  id: 'container',
                  title: 'Danh sách container',
                  type: 'item',
                  url: '/setting/docker/container',
                  target: true,
                  breadcrumbs: false
                },
                {
                  id: 'image',
                  title: 'Danh sách image',
                  type: 'item',
                  url: '/setting/docker/image',
                  target: true,
                  breadcrumbs: false
                },
                {
                  id: 'docker',
                  title: 'Thông tin docker',
                  type: 'item',
                  url: '/setting/docker/info',
                  target: true,
                  breadcrumbs: false
                }
              ]
            },
            {
              id: 'system',
              title: 'Quản lý hệ thống',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'config',
              title: 'Cấu hình thông báo (telegram)',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'log',
          title: 'Lịch sử log',
          type: 'collapse',
          icon: 'feather icon-lock',
          children: [
            {
              id: 'datalog',
              title: 'Quản lý dữ liệu log',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },
            ,
            {
              id: 'resultCheck',
              title: 'Quản lý kết quả rà soát',
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

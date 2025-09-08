import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 3,
    label: 'Inicio',
    icon: ' ri-home-2-line',
    link: '/',
    rolesAllowed: [1,2,3,4]
  },
  
  /*AGREGADO RECIENTEMENT */
  {
    id: 2,
    label: 'MENUITEMS.COMPONENTS.TEXT',
    isTitle: true,
    rolesAllowed: [1]
  },
  {
    id: 4,
    label: 'Usuarios',
    icon: ' ri-group-2-fill',
    link: '/user',
    rolesAllowed: [1]
  },
  
  {
    id: 5,
    label: 'Servicios',
    isTitle: true
  },
  {
    id: 17,
    label: 'Variables',
    icon: ' ri-pie-chart-fill',
    link: '/variety',
    rolesAllowed: [1]
  },
  /*----------
  {
    id: 6,
    label: 'Horario',
    icon: 'ri-apps-2-line',
    isCollapsed: true,
    subItems: [
      {
        id: 7,
        label: 'Elaboracion de Horarios',
        link: '/schedule',
        parentId: 6
      },
      {
        id: 8,
        label: 'Opcion multiple',
        parentId: 6,
        subItems: [
          {
            id: 9,
            label: 'MENUITEMS.PAGES.LIST.SIMPLEPAGE',
            link: '/pages/profile',
            parentId: 8
          },
          {
            id: 10,
            label: 'MENUITEMS.PAGES.LIST.SETTINGS',
            link: '/pages/profile-setting',
            parentId: 8
          },
        ]
      },

    ]
  },
*/

];

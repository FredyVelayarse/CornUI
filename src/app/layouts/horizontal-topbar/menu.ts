import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'Inicio',
    icon: ' ri-home-2-line',
    link:'/',
    rolesAllowed: [1,2,3,4]
  },
  /*AGREGADO RECIENTEMENT */
  {
    id: 3,
    label: 'Usuarios',
    icon: ' ri-group-line',
    link:'/user',
    rolesAllowed: [1]
  },
  /*-------------- */
  {
    id: 8,
    label: 'Servicios',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 9,
        label: 'Oficinas',
        link: '/office',
        parentId: 8,
        rolesAllowed: [1]
      },
      {
        id: 10,
        label: 'Centro de Producción',
        link: '/production-center',
        parentId: 8,
        rolesAllowed: [1]
      },
      {
        id: 11,
        label: 'Directores de Centros',
        link: '/director',
        parentId: 8,
        rolesAllowed: [1]
      },
      
      {
        id: 12,
        label: 'Activar cuentas',
        link: '/active',
        parentId: 8,
        rolesAllowed: [2]
      },
      {
        id: 13,
        label: 'Registros',
        link: '/search',
        parentId: 8,
        rolesAllowed: [2]
      },
      {
        id: 14,
        label: 'Docentes',
        link: '/teacher',
        parentId: 8,
        rolesAllowed: [2]
      },
      {
        id: 15,
        label: 'Cursos Asignados',
        link: '/cursos-asignados',
        parentId: 8,
        rolesAllowed: [4]
      },
      {
        id: 16,
        label: 'Cursos Matriculados',
        link: '/cursos-matriculados',
        parentId: 8,
        rolesAllowed: [3]
      },
      {
        id: 17,
        label: 'Cursos',
        link: '/course',
        parentId: 8,
        rolesAllowed: [2]
      },
      {
        id: 17,
        label: 'Matriculas',
        link: '/matricula',
        parentId: 8,
        rolesAllowed: [2]
      },
      {
        id: 12,
        label: 'Certificados',
        link: '/certificate',
        parentId: 8,
        rolesAllowed: [2]
      },
    ]
  }
];

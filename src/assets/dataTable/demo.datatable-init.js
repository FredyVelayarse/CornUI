var spanishLanguage = {
  paginate: {
    previous: "<i class='mdi mdi-chevron-left'></i>",
    next: "<i class='mdi mdi-chevron-right'></i>",
  },
  lengthMenu: "Mostrar _MENU_ registros por página",
  zeroRecords: "No se encontraron resultados",
  info: "Mostrando página _PAGE_ de _PAGES_ páginas",
  infoEmpty: "No hay registros disponibles",
  infoFiltered: "[Filtrado _MAX_ registros totales]",
  search: "Buscar registros:",
  loadingRecords: "Cargando...",
  processing: "Procesando...",
  emptyTable: "No hay datos disponibles en la tabla",
  infoPostFix: "",
  thousands: ",",
  decimal: ".",
  searchPlaceholder: "Buscar...",
  aria: {
    sortAscending: ": activar para ordenar la columna de manera ascendente",
    sortDescending: ": activar para ordenar la columna de manera descendente",
  },
};
$(document).ready(function () {
  "use strict";
  $("#basic-datatable").DataTable({
    keys: !0,
    language: {
      paginate: {
        previous: "<i class='mdi mdi-chevron-left'>",
        next: "<i class='mdi mdi-chevron-right'>",
      },
    },
    language: spanishLanguage,
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination");
    },
  });
  var a = $("#datatable-buttons").DataTable({
    lengthChange: !1,
    buttons: ["copy", "print","pdf"],
    language: {
      paginate: {
        previous: "<i class='mdi mdi-chevron-left'>",
        next: "<i class='mdi mdi-chevron-right'>",
      },
    },
    language: spanishLanguage,
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination");
    },
  });
  $("#selection-datatable").DataTable({
    select: { style: "multi" },
    language: {
      paginate: {
        previous: "<i class='mdi mdi-chevron-left'>",
        next: "<i class='mdi mdi-chevron-right'>",
      },
    },
    language: spanishLanguage,
    drawCallback: function () {
      $(".dataTables_paginate > .pagination").addClass("pagination");
    },
  }),
    a.buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)"),
    $("#alternative-page-datatable").DataTable({
      pagingType: "full_numbers",
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination");
      },
    }),
    $("#scroll-vertical-datatable").DataTable({
      scrollY: "350px",
      scrollCollapse: !0,
      paging: !1,
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>",
        },
      },
      language: spanishLanguage,
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination");
      },
    }),
    $("#scroll-horizontal-datatable").DataTable({
      scrollX: !0,
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>",
        },
      },
      language: spanishLanguage,
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination");
      },
    }),
    $("#complex-header-datatable").DataTable({
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>",
        },
      },
      language: spanishLanguage,
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination");
      },
      columnDefs: [{ visible: !1, targets: -1 }],
    }),
    $("#row-callback-datatable").DataTable({
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>",
        },
      },
      language: spanishLanguage,
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination");
      },
      createdRow: function (a, e, t) {
        15e4 < +e[5].replace(/[\$,]/g, "") &&
          $("td", a).eq(5).addClass("text-danger");
      },
    }),
    $("#state-saving-datatable").DataTable({
      stateSave: !0,
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>",
        },
      },
      language: spanishLanguage,
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination");
      },
    }),
    $("#fixed-columns-datatable").DataTable({
      scrollY: 300,
      scrollX: !0,
      scrollCollapse: !0,
      paging: !1,
      fixedColumns: !0,
    }),
    $(".dataTables_length select").addClass("form-select form-select-sm"),
    $(".dataTables_length label").addClass("form-label");
}),
$(document).ready(function () {
    var a = $("#fixed-header-datatable").DataTable({
      responsive: !0,
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>",
        },
      },
      language: spanishLanguage,
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass("pagination");
      },
    });
    new $.fn.dataTable.FixedHeader(a)
  });

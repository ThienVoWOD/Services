
//  validation trang bán page
$(function () {
  $('#sellPage').validate({
    rules: {
      name: {
        required: true,
      },
      number_of_like: {
        required: true,
      },
      price: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Vui lòng nhập tên page!",
      },
      number_of_like: {
        required: "Vui lòng nhập số like!",
      },
      price: {
        required: "Vui lòng nhập số tiền!",
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback text-right');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
});


//  validation trang đổi tên
$(function () {
  $('#changeName').validate({
    rules: {
      name: {
        required: true,
      },
      new_name: {
        required: true,
      },
      link_page: {
        required: true,
      },
      price: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Vui lòng nhập tên page!",
      },
      new_name: {
        required: "Vui lòng nhập tên mới của page!",
      },
      link_page: {
        required: "Vui lòng nhập link page!",
      },
      price: {
        required: "Vui lòng nhập số tiền!",
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback text-right');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
});

//  validation trang đổi tên
$(function () {
  $('#buffLike').validate({
    rules: {
      name: {
        required: true,
      },
      link_page: {
        required: true,
      },
      need_to_increase: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Vui lòng nhập tên page!",
      },
      link_page: {
        required: "Vui lòng nhập link page!",
      },
      need_to_increase: {
        required: "Vui lòng nhập số like cần tăng!",
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback text-right');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
});

$(function () {
  $('#user').validate({
    rules: {
      name: {
        required: true,
      },
      username: {
        required: true,
      },
      password: {
        required: true,
        minlength: 5
      },
      link_fb: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Vui lòng nhập họ và tên!",
      },
      username: {
        required: "Vui lòng nhập tên tài khoản!",
      },
      // password: {
      //   required: "Vui lòng nhập mật khẩu!",
      //   minlength: "Mật khẩu ít nhất là 5 kí tự!",
      // },
      link_fb: {
        required: "Vui lòng nhập link fb!",
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback text-right');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
});

// select option

  $(function () {
    $('.select2').select2()
  })

  // select input

  $(document).ready(function () {
    $('[name=price]').maskNumber({integer: true});
    $('[name=number_of_like]').maskNumber({integer: true});
    $('[name=need_to_increase]').maskNumber({integer: true});
  });

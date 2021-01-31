
  var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  function status(id, status, services) {
    $.ajax({
      url: '/admin/'+services+'/update/status/'+id,
      data: { "status": status },
      dataType:"html",
      type: "post",
      success: function(data){
        Toast.fire({
          icon: "success",
          title: " Thay đổi thành công",
        });

        switch (status) {
          case 'Chưa xử lý':
            $( `#status${id}` ).html( '<span class="badge bg-danger">'+ status +'</span>' );
          break;
          case 'Đang xử lý':
            $( `#status${id}` ).html( '<span class="badge bg-primary">'+ status +'</span>' );
          break;
          case 'Chưa thanh toán':
            $( `#status${id}` ).html( '<span class="badge bg-warning">'+ status +'</span>' );
          break;
          case 'Đã thanh toán':
            $( `#status${id}` ).html( '<span class="badge bg-success">'+ status +'</span>' );
          break;
        }
      },
      error: (data)=>{
        Toast.fire({
          icon: 'error',
          title: ' Thay đổi thất bại'
        })
      }
    });
  }

function destroy(url) {
Swal.fire({
  icon: 'question',
  title: 'Xác nhận',
  html: 'Bạn có chắc muốn xóa tài khoản này?',
  confirmButtonText: 'Có',
  cancelButtonText: 'Không',
  showCancelButton: true,
  showCloseButton: true,
  showLoaderOnConfirm: true,
  preConfirm: () => {
    return $.ajax({
      type: 'post',
      url: url,
      dataType:"html",
    });
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then(async (result) => {
  if (result.isConfirmed) {
    if (result.value) {
      Swal.fire(
        'Xong!',
        'Xóa thành công.',
        'success'
      ).then(() => {
        window.location.reload();
      });
    }
     else {
      Swal.fire(
        'Lỗi!',
        'Xóa thất bại.',
        'error'
      );
    }
  }
})
}

var errors = {
  'vn': {
    '0': 'Không thành công',
    '-1': 'Lỗi hệ thống',
    '-100': 'Tên đăng nhập không hợp lệ. Tên đăng nhập phải ít nhất 6 kí tự và nhiều nhất 24 kí tự, bao gồm chữ hoặc số.',
    '-101': 'Tên đăng nhập đã tồn tại',
    '-102': 'Mật khẩu không hợp lệ. Mật khẩu phải ít nhất 6 kí tự và nhiều nhất 50 kí tự, bao gồm chữ hoặc số.',
    '-103': 'Email không hợp lệ. Email ít nhất 6 kí tự và nhiều nhất 45 kí tự.',
    '-104': 'Email đã tồn tại.',
    '-105': 'Mã ứng dụng không tồn tại.',
    '-106': 'Số điện thoại không hợp lệ.',
    '-107': 'Người dùng không tồn tại.',
    '-108': 'Sai mật khẩu',
    '-109': 'Sai tên đăng nhập hoặc mật khẩu.',
    '-110': 'Dữ liệu đầu vào không hợp lệ.',
    '-111': 'Không có quyền truy cập.',
    '-112': 'Dữ liệu trùng',
    '-113': 'Không tìm thấy dữ liệu yêu cầu.',
    '-114': 'Không có quyền chỉnh sửa.'
  }
}

var getErrorMessage = function (errCode, langCode = 'vn') {
  return errors[langCode][String(errCode)] || 'Lỗi hệ thống'
}

module.exports = getErrorMessage

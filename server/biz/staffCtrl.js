const {
  createStaff,
  deleteStaffById,
  findStaffById,
  updateStaffById,
  getStaffs,
} = require('../dao/staff');
const { assertTruth, phoneValid, removeUndefined } = require('../util');
const { ERROR_CODE } = require('../constant');

// 这个接口用来筛选数据
exports.staffs = async ({ skip, limit }) => {
  const staffs = await getStaffs(skip, limit);
  assertTruth({
    value: staffs,
    message: 'staffs not found',
  });
  return { staffs };
};

// 修改数据的接口
exports.changeData = async ({ id, phone, ...rest }) => {
  assertTruth({
    value: !(phone && !phoneValid(phone)),
    errorCode: ERROR_CODE.INVALID_PARAM,
    message: 'phone: invalid format',
  });
  const staff = await findStaffById(id);
  assertTruth({
    value: staff,
    message: 'staff not fount',
  });
  await updateStaffById(id, removeUndefined({ phone, ...rest }));
  return { id };
};

// 删除数据的接口
exports.del = async ({ id }) => {
  const deletedS = await deleteStaffById(id);
  assertTruth({
    value: deletedS,
    message: 'delete staff error',
  });
  return { id: deletedS._id };
};

// 添加员工的接口
exports.add = async ({ ...staff }) => {
  const savedS = await createStaff(staff);
  assertTruth({
    value: savedS,
    message: 'save staff error',
  });
  return { id: savedS._id };
};
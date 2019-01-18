const express = require('express');
const validate = require('express-validation');
const staffCtrl = require('../biz/staffCtrl');
const { createRouteHandler } = require('../util');
const {
  staffAdd,
  staffDelete,
  staffUpdate,
  staffGet,
} = require('./validation/staff');
const { pagination } = require('../middleware/pagination');

const staffRouter = new express.Router();
// 获取员工数据
staffRouter.get(
  '/getStaffs',
  validate(staffGet),
  pagination,
  createRouteHandler(({ query }) => staffCtrl.staffs({ ...query })),
);
// 修改员工数据
staffRouter.put(
  '/update/:id',
  validate(staffUpdate),
  createRouteHandler(({ body, params }) =>
    staffCtrl.changeData({ ...body, ...params }),
  ),
);
// 删除员工
staffRouter.delete(
  '/del',
  validate(staffDelete),
  createRouteHandler(({ body }) => staffCtrl.del({ ...body })),
);
// 添加员工
staffRouter.post(
  '/add',
  validate(staffAdd),
  createRouteHandler(({ body }) => staffCtrl.add({ ...body })),
);

module.exports = staffRouter;

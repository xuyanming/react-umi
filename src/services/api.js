export default {
  queryRouteList: '/routes',
  loginUser:'POST /ajax/user/login',
  logoutUser: 'POST /ajax/user/logout',
 
  querycode:'POST /ajax/user/code/send',
  reset:'POST /ajax/user/reset/password',
  setcode:'POST /ajax/user/reset/code',
  changepassword:'POST /ajax/user/password/change',
  //企业信息设置
  querycom:'/ajax/business/info',
  setcom:'POST /ajax/business/info',
  // 其他设置详情
  queryother:'/ajax/business/setting/detail',
  setother:'POST /ajax/business/setting/edit',
  //待办
  quweybacklog:'/ajax/deduction/backlog',
  dealtDetail:'/ajax/deduction/auditing/detail',
  dealtAudit:'POST /ajax/deduction/audit',
  // 个税
  quweytaxs:'/ajax/deduction/apply/info',
  finishtaxs:'POST /ajax/deduction/apply/finish',
  amount:'POST /ajax/deduction/amount/change',
  yearall:'/ajax/deduction/staff/stats',
  detailtaxs:'/ajax/deduction/apply/detail',
  exporttaxs:'POST /ajax/deduction/apply/export',
  exportalltaxs:'POST /ajax/deduction/info/export',
  //部门信息
  departTree:'/ajax/business/department/stats',
  departadd:'POST /ajax/business/department/add',
  departedit:'POST /ajax/business/department/edit',
  departdelete:'POST /ajax/business/department/delete',
  //员工管理
  querystaff:'/ajax/business/staff/stats',
  addstaff:'POST /ajax/business/staff/add',
  editstaff:'POST /ajax/business/staff/edit',
  resignstaff:'POST /ajax/business/staff/dismiss',
  importstaff:'POST /ajax/business/staff/import',
  movestaff:'POST /ajax/business/staff/dept/change',
  download:'/ajax/business/staffxls/download',

}

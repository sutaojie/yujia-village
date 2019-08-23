import request from '@/utils/request';

/* 培训信息列表 */
export function getTrains() {
  return request('/trains')
}

/** 培训信息筛选 */
export function postTrains(args) {
  let params = {
    startTime: "",
    endTime: "",
    minPrice: "",
    maxPrice: "",
    province: "",
    city: "",
    area: "",
    diff: "", // 难度,整数,小于10
    course_type_id: "", // 瑜伽类型,数组传参且数组元素必须是正整数(数组元素是瑜伽类型的id)
  }
  params = Object.assign({}, params, args)
  return request.post('/trains', params)
}

/* 培训信息详情 */
export function getTrainsById(id) {
  return request(`/trains/${id}`)
}
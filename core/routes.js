import routes from './../api/configs/routes'

export default routes.map(route => {
  let list = route.trim().split(' ').filter(item => item);
  return {
    method: list[0].trim(),
    url: list[1].trim(),
    controller: list[2].trim(),
    action: list[3].trim(),
    policies: (list[4] || "").split(',').map(item => item.trim())
  }
})
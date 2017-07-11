export default [
  {
    url: "/users",
    method: "get",
    controller: "UserController",
    action: "fetch",
    policies: ['isUser']
  },
  {
    url: "/users",
    method: "post",
    controller: "UserController",
    action: "create",
    policies: ['isUser']
  },
]
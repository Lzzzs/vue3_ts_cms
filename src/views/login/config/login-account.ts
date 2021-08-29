export const rules = {
  name: [
    {
      required: true,
      message: '账号不能为空',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 10,
      message: '账号长度在 6 到 10 个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
  ]
}

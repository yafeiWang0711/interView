import { ref } from 'vue'
// 表单验证

export const useFormValidation = () => {
  const errors = ref({})

  const validate = (values) => {
    errors.value = {}
    for (const field in values) {
      if (!values[field]) {
        errors.value[field] = '请输入'
      }
    }
    return errors.value
  }

  return {
    errors,
    validate
  }
}

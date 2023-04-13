import * as yup from 'yup'
import formValidators from '../../formValidatorsConfig.json'

const supplyInputs = formValidators.supplyForm.inputs

export const supplySchema = yup.object().shape({
  firstName: supplyInputs.firstName.validators[0].required && yup.string().required(),
  lastName: supplyInputs.lastName.validators[0].required && yup.string().required(),
  status: supplyInputs.status.validators[0].required && yup.string().required(),
  skillID: supplyInputs.skillID.validators[0].required && yup.string().required(),
  notes: supplyInputs.notes.validators[0].required && yup.string().required(),
  type: supplyInputs.type.validators[0].required && yup.string().required(),
  location: supplyInputs.location.validators[0].required && yup.string().required(),
})

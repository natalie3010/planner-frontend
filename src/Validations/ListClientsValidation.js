import * as yup from 'yup'
import formValidators from '../../formValidatorsConfig.json'

const clientInputs = formValidators.addClientForm.inputs

export const clientSchema = yup.object().shape({
  id: clientInputs.id.validators[0].required && yup.string().trim('no white space').required(),
  name: clientInputs.name.validators[0].required && yup.string().trim('no white space').required(),
})

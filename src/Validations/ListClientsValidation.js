import * as yup from 'yup'
import formValidators from '../../formValidatorsConfig.json'

const clientInputs = formValidators.addClientForm.inputs

export const clientSchema = yup.object().shape({
  clientID: clientInputs.clientID.validators[0].required && yup.string().required(),
  clientName: clientInputs.clientName.validators[0].required && yup.string().required(),
})

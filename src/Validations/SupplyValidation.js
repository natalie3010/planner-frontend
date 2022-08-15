import * as yup from 'yup'
import formValidators from '../../formValidatorsConfig.json'

const supplyInputs = formValidators.supplyForm.inputs

export const demandSchema = yup.object().shape({
  supplyFName: supplyInputs.supplyFName.validators[0].required && yup.string().required(),
  supplyLName: supplyInputs.supplyLName.validators[0].required && yup.string().required(),
  supplyStatus: supplyInputs.supplyStatus.validators[0].required && yup.string().required(),
  supplySkillId: supplyInputs.supplySkillId.validators[0].required && yup.string().required(),
  supplyNotes: supplyInputs.supplyNotes.validators[0].required && yup.string().required(),
  supplyType: supplyInputs.supplyType.validators[0].required && yup.string().required(),
  supplyLocation: supplyInputs.supplyLocation.validators[0].required && yup.string().required(),
})

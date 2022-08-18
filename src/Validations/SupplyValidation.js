import * as yup from 'yup'
import formValidators from '../../formValidatorsConfig.json'

const supplyInputs = formValidators.supplyForm.inputs

export const supplySchema = yup.object().shape({
  applicantFirstName: supplyInputs.applicantFirstName.validators[0].required && yup.string().required(),
  applicantLastName: supplyInputs.applicantLastName.validators[0].required && yup.string().required(),
  applicantStatus: supplyInputs.applicantStatus.validators[0].required && yup.string().required(),
  applicantSkills: supplyInputs.applicantSkills.validators[0].required && yup.string().required(),
  applicantNotes: supplyInputs.applicantNotes.validators[0].required && yup.string().required(),
  applicantType: supplyInputs.applicantType.validators[0].required && yup.string().required(),
  applicantLocation: supplyInputs.applicantLocation.validators[0].required && yup.string().required(),
})

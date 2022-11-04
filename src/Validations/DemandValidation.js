import * as yup from 'yup'
import formValidators from '../../formValidatorsConfig.json'

const demandInputs = formValidators.demandForm.inputs

export const demandSchema = yup.object().shape({
  codeRequisition: demandInputs.codeRequisition.validators[0].required && yup.string().required(),
  startDate:
    demandInputs.startDate.validators[0].required &&
    yup.string().required().matches(new RegExp(demandInputs.startDate.validators[0].pattern)),
  id: demandInputs.id.validators[0].required && yup.string().required(),
  originatorName: demandInputs.originatorName.validators[0].required && yup.string().required(),
  skillID: demandInputs.skillID.validators[0].required && yup.string().required(),
  probability: demandInputs.probability.validators[0].required && yup.string().required(),
  grade: demandInputs.grade.validators[0].required && yup.string().required(),
  selectedApplicant: demandInputs.selectedApplicant.validators[0].required && yup.string().required(),
  status: demandInputs.status.validators[0].required && yup.string().required(),
  notes: demandInputs.notes.validators[0].required && yup.string().required(),
  proposedApplicant: demandInputs.proposedApplicant.validators[0].required && yup.string().required(),
  creationDate:
    demandInputs.creationDate.validators[0].required &&
    yup.string().required().matches(new RegExp(demandInputs.creationDate.validators[0].pattern)),
  location: demandInputs.location.validators[0].required && yup.string().required(),
})
